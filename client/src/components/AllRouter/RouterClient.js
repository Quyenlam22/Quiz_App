import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/clients/index";

function RouterClient() {
    const elements = useRoutes(routes);

    return (
        <>
            {elements}
        </>
    )
}

export default RouterClient;