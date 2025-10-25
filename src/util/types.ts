export interface TicketType{
    title: string;
    status: "open"|"in_progress"|"closed"
    desc: string;
    priority: "high"|"medium"|"low"|"none"
    // assigned: string;
    _id?:string;
}
export interface User {
    id: string,
    name: string,
    email: string
  }