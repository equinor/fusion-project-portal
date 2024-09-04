import React, { LegacyRef, useEffect, useRef } from "react";
import { useRouterConfigContext } from "../../context/RouterContext";
import styled from "styled-components";

const CodeStyle = styled.pre`
  background-color: #242a2d;
  border: 2px solid #3a3d3e;
  color: #ffffff;
  padding: 1.5rem;
  font-family: monospace;
  max-height: 600px;
  overflow: auto;
  .key {
    color: rgb(156, 220, 254);
  }
  .string {
    color: rgb(214, 157, 133);
  }
  .boolean {
    color: rgb(86, 156, 214);
  }
  .null {
    color: rgb(86, 156, 214);
  }
  .number {
    color: rgb(184, 215, 163);
  }
`;

export const RouterConfig: React.FC = () => {
  const { root, routes } = useRouterConfigContext();
  const config = {
    root,
    routes,
  };
  return (
    <CodeStyle>
      <Code config={config} />
    </CodeStyle>
  );
};

const Code = ({ config }: { config: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = syntaxHighlight(config);
  }, [ref, config]);

  return <div ref={ref}></div>;
};

function syntaxHighlight(json: any) {
  if (typeof json != "string") {
    json = JSON.stringify(json, null, 2);
  }

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match: string) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}
