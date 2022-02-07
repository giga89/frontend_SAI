export type Routes =
  | "/"
  | "/admin"
  | "/dashboard"
  | "/ships"
  | "/ships/table"
  | "/ships/table"
  | "/ships/:shipId";

export const getRoute = <Route extends Routes>(route: Route) => route;
