using System.Text.RegularExpressions;
using Equinor.ProjectExecutionPortal.ClientBackend.Models.AKA;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    [Authorize]
    public class AkaController : Controller
    {
        [HttpGet("/aka/{*shortpath}")]
        public async Task<IActionResult> RedirectHandler(string shortpath)
        {
            if (string.IsNullOrEmpty(shortpath))
            {
                return new BadRequestObjectResult(new { error = new { message = "Shortcut path cannot be empty" } });
            }

            var config = await GetConfigurationAsync();

            var tokens = shortpath.Split(new[] { '/' }, 2);
            var ruleGroup = tokens[0];
            var akaPath = $"/{shortpath}";

            var ruleSection = config.Rules.FirstOrDefault(rule => string.Equals(rule.Path, ruleGroup, StringComparison.OrdinalIgnoreCase));

            if (ruleSection == null)
            {
                return new NotFoundObjectResult(new { error = new { message = "Could not locate shortcut path: " + ruleGroup } });
            }

            switch (ruleSection.Type)
            {
                case AkaRuleType.Regex:
                    var match = Regex.Match(akaPath, ruleSection.Regex.Pattern);

                    if (!match.Success)
                    {
                        return new NotFoundObjectResult(new { error = new { message = "Redirect rule could not find any match, might be an issue with the rule." } });
                    }

                    var newPath = Regex.Replace(akaPath, ruleSection.Regex.Pattern, ruleSection.Regex.Replace);

                    return LocalRedirectPermanent(newPath);

                default:
                    return new BadRequestObjectResult(new { error = new { message = "Redirect rule is not supported" } });
            }
        }

        private static Task<AkaModel> GetConfigurationAsync()
        {
            var model = new AkaModel
            {
                Rules = new List<AkaRule>
                {
                    new()
                    {
                        Path = "goto-meeting",
                        Type = AkaRuleType.Regex,
                        Regex = new AkaRegexRule
                        {
                            Pattern = "/goto-meeting/([\\d\\w-]+)",
                            Replace = "/apps/meetings/meeting/$1"
                        }
                    },
                    new()
                    {
                        Path = "goto-series",
                        Type = AkaRuleType.Regex,
                        Regex = new AkaRegexRule
                        {
                            Pattern = "/goto-series/([\\d\\w-]+)",
                            Replace = "/apps/meetings/series/$1"
                        }
                    },
                    new()
                    {
                        Path = "goto-action",
                        Type = AkaRuleType.Regex,
                        Regex = new AkaRegexRule
                        {
                            Pattern = "/goto-action/([^/]+)/([\\d\\w-]+)",
                            Replace = "/apps/meetings/meeting/$1/actions/$2"
                        }
                    }
                }
            };

            return Task.FromResult(model);
        }
    }
}
