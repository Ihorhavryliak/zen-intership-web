import jwt_decode from "jwt-decode";

export function getTokenId() {
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("token") !== undefined
  ) {
    const data = localStorage.getItem("token") as string;
    const id = jwt_decode(data) as { id: string };
    return id.id;
  }
  return "";
}
