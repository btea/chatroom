export default function startLink(link: string): WebSocket {
    const ws = new WebSocket(link);
    return ws;
}
