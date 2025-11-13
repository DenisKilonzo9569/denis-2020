// Simple mock API functions (replace with real backend endpoints)
export const api = {
  getProducers: async () => [
    { id: 1, name: "St. Mary's Primary - Kitchen Waste", location: "Embu Road", phone: "0710XXXXXX", wasteTypes: ["organic","paper"], coords: [-1.512, 37.266] },
    { id: 2, name: "Jane Mwende (Household)", location: "Athiriver", phone: "0722XXXXXX", wasteTypes: ["plastic"], coords: [-1.474, 37.300] },
    { id: 3, name: "Machakos Market (Vendor Cluster)", location: "Machakos Town", phone: "0700XXXX00", wasteTypes: ["organic","plastic"], coords: [-1.511, 37.261] }
  ],
  getRecyclers: async () => [
    { id: 1, name: "Machakos Plastics Ltd", materials: ["plastic"], capacityKg: 500, contact: "0733XXXXXX", coords: [-1.508, 37.270] },
    { id: 2, name: "GreenCompost Co.", materials: ["organic"], capacityKg: 300, contact: "0700XXXXXX", coords: [-1.505, 37.258] }
  ],
  getChampions: async () => [
    { id: 1, name: "Peter Karanja", area: "Mlolongo", phone: "0711XXXXXX", points: 220, coords: [-1.470, 37.305] },
    { id: 2, name: "Mercy W.", area: "Machakos Town", phone: "0721XXXXXX", points: 180, coords: [-1.5095, 37.262] }
  ],
  createPickupRequest: async (req) => ({ success: true, id: Math.floor(Math.random()*10000), ...req }),
  reportIssue: async (report) => ({ success: true, ticketId: Math.floor(Math.random()*90000)+1000 })
};
export default api;
