import axios, { AxiosRequestConfig } from "axios"
import { IAppInfo, ITotalInfo } from "./types"
const proxyKey = process.env.REACT_APP_PROXY_KEY
const host = axios.create({
  baseURL: "https://proxy.cors.sh/",
  headers: { 'x-cors-grida-api-key': proxyKey, "cors-api-key": proxyKey } as  AxiosRequestConfig<any>["headers"]
})
export const steamApi = {
  async getTotalInfo() {
    const { data } = await host.get<ITotalInfo>("/https://www.valvesoftware.com/about/stats")
    return data
  },
  async getAppsFromQuery(q: string) {
    const { data } = await host.get<IAppInfo[]>(`/https://steamcommunity.com/actions/SearchApps/${q}`)
    return data 
  },
}