import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/clients/index";
import { routesAdmin } from "../../routes/admin";

function RouterClient() {
    const elements = useRoutes([...routes, ...routesAdmin]);

    return (
        <>
            {elements}
        </>
    )
}

export default RouterClient;