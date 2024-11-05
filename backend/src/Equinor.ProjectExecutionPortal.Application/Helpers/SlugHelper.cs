using System.Globalization;
using System.Text;

namespace Equinor.ProjectExecutionPortal.Application.Helpers;

// https://github.com/zarxor/url-friendly-slug
public static class SlugHelper
{
    /// <summary>
    /// Creates a URL And SEO friendly slug
    /// </summary>
    /// <param name="text">Text to slugify</param>
    /// <param name="maxLength">Max length of slug</param>
    /// <returns>URL and SEO friendly string</returns>
    public static string Sluggify(string text, int maxLength = 0)
    {
        var normalizedString = text
            .ToLowerInvariant()
            .Normalize(NormalizationForm.FormD);

        var stringBuilder = new StringBuilder();
        var stringLength = normalizedString.Length;
        var prevdash = false;
        var trueLength = 0;

        for (var i = 0; i < stringLength; i++)
        {
            var c = normalizedString[i];

            switch (CharUnicodeInfo.GetUnicodeCategory(c))
            {
                // Check if the character is a letter or a digit if the character is a
                // international character remap it to an ascii valid character
                case UnicodeCategory.LowercaseLetter:
                case UnicodeCategory.UppercaseLetter:
                case UnicodeCategory.DecimalDigitNumber:
                    if (c < 128)
                    {
                        stringBuilder.Append(c);
                    }
                    else
                    {
                        stringBuilder.Append(RemapInternationalCharToAscii(c));
                    }

                    prevdash = false;
                    trueLength = stringBuilder.Length;
                    break;

                // Check if the character is to be replaced by a hyphen but only if the last character wasn't
                case UnicodeCategory.SpaceSeparator:
                case UnicodeCategory.ConnectorPunctuation:
                case UnicodeCategory.DashPunctuation:
                case UnicodeCategory.OtherPunctuation:
                case UnicodeCategory.MathSymbol:
                    if (!prevdash)
                    {
                        stringBuilder.Append('-');
                        prevdash = true;
                        trueLength = stringBuilder.Length;
                    }
                    break;
            }

            // If we are at max length, stop parsing
            if (maxLength > 0 && trueLength >= maxLength)
            {
                break;
            }
        }

        // Trim excess hyphens
        var result = stringBuilder.ToString().Trim('-');

        // Remove any excess character to meet maxlength criteria
        return maxLength <= 0 || result.Length <= maxLength ? result : result.Substring(0, maxLength);
    }

    /// <summary>
    /// Remaps international characters to ascii compatible ones
    /// based of: https://meta.stackexchange.com/questions/7435/non-us-ascii-characters-dropped-from-full-profile-url/7696#7696
    /// </summary>
    /// <param name="c">Charcter to remap</param>
    /// <returns>Remapped character</returns>
    private static string RemapInternationalCharToAscii(char c)
    {
        var value = c.ToString().ToLowerInvariant();

        if ("àåáâäãåą".Contains(value))
        {
            return "a";
        }
        if ("èéêëę".Contains(value))
        {
            return "e";
        }
        if ("ìíîïı".Contains(value))
        {
            return "i";
        }
        if ("òóôõöøőð".Contains(value))
        {
            return "o";
        }
        if ("ùúûüŭů".Contains(value))
        {
            return "u";
        }
        if ("çćčĉ".Contains(value))
        {
            return "c";
        }
        if ("żźž".Contains(value))
        {
            return "z";
        }
        if ("śşšŝ".Contains(value))
        {
            return "s";
        }
        if ("ñń".Contains(value))
        {
            return "n";
        }
        if ("ýÿ".Contains(value))
        {
            return "y";
        }
        if ("ğĝ".Contains(value))
        {
            return "g";
        }
        if (c == 'ř')
        {
            return "r";
        }
        if (c == 'ł')
        {
            return "l";
        }
        if (c == 'đ')
        {
            return "d";
        }
        if (c == 'ß')
        {
            return "ss";
        }
        if (c == 'þ')
        {
            return "th";
        }
        if (c == 'ĥ')
        {
            return "h";
        }
        if (c == 'ĵ')
        {
            return "j";
        }

        return "";
    }
}