using System.Text.RegularExpressions;
using Equinor.ProjectExecutionPortal.ClientBackend.Domain.Exceptions;
using Equinor.ProjectExecutionPortal.ClientBackend.Models.AKA;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    //[Authorize]
    [Route("aka")]
    public class AkaController : Controller
    {
        [HttpGet("v2/{*shortpath}")]
        public async Task<ActionResult<string>> GetPath([FromRoute] string shortpath)
        {
            if (string.IsNullOrEmpty(shortpath))
            {
                return new BadRequestObjectResult(new { error = new { message = "Shortcut path cannot be empty" } });
            }

            try
            {
                return await GenerateNewPath(shortpath);
            }
            catch (NotFoundException ex)
            {
                return new NotFoundObjectResult(new { error = new { message = ex.Message } });
            }
            catch (BadRequestException ex)
            {
                return new BadRequestObjectResult(new { error = new { message = ex.Message } });
            }
        }

        [HttpGet("{*shortpath}")]
        public async Task<IActionResult> RedirectToPath([FromRoute] string shortpath)
        {
            if (string.IsNullOrEmpty(shortpath))
            {
                return new BadRequestObjectResult(new { error = new { message = "Shortcut path cannot be empty" } });
            }

            try
            {
                var newPath = await GenerateNewPath(shortpath);
                return LocalRedirectPermanent(newPath);
            }
            catch (NotFoundException ex)
            {
                return new NotFoundObjectResult(new { error = new { message = ex.Message } });
            }
            catch (BadRequestException ex)
            {
                return new BadRequestObjectResult(new { error = new { message = ex.Message } });
            }
        }

        private static async Task<string> GenerateNewPath(string shortpath)
        {
            var config = await GetConfigurationAsync();

            var tokens = shortpath.Split(new[] { '/' }, 2);
            var ruleGroup = tokens[0];
            var akaPath = $"/{shortpath}";

            var ruleSection = config.Rules.FirstOrDefault(rule => string.Equals(rule.Path, ruleGroup, StringComparison.OrdinalIgnoreCase));

            if (ruleSection == null)
            {
                throw new NotFoundException("Could not locate shortcut path", ruleGroup);
            }

            switch (ruleSection.Type)
            {
                case AkaRuleType.Regex:
                    var match = Regex.Match(akaPath, ruleSection.Regex.Pattern);

                    if (!match.Success)
                    {
                        throw new NotFoundException("Redirect rule could not find any match, might be an issue with the rule.");
                    }

                    var newPath = Regex.Replace(akaPath, ruleSection.Regex.Pattern, ruleSection.Regex.Replace);

                    return newPath;

                default:
                    throw new BadRequestException("Redirect rule is not supported");
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
