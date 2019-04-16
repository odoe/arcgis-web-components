import { loadModules } from 'esri-loader';

export async function fetchPortalItem(itemid: string, portalUrl?: string) {
  const [Portal, PortalQueryParams] = await loadModules(['esri/portal/Portal', 'esri/portal/PortalQueryParams']);
  const portal = new Portal();
  await portal.load();
  const queryParams = new PortalQueryParams({
    query: `id: ${itemid}`
  });
  const { results } = await portal.queryItems(queryParams);
  return results[0];
}