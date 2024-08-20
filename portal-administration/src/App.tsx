import { RouterProvider } from "react-router-dom";
import { useRouter } from "@equinor/fusion-framework-react-app/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled from "styled-components";
import routes from "./routes";
import { tokens } from "@equinor/eds-tokens";

const queryClient = new QueryClient();

const Style = {
  Root: styled.div`
    background-color: ${tokens.colors.ui.background__light.hex};
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
  `,
};

export default function () {
  const router = useRouter(routes);
  return (
    <Style.Root>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} fallbackElement={<p>Error...</p>} />
      </QueryClientProvider>
    </Style.Root>
  );
}
