export class APILogger {
  private recentLogs: Array<{ type: string; data: object }> = [];

  logRequest(
    method: string,
    url: string,
    headers: Record<string, string>,
    body?: object,
  ): void {
    const logEntry = { method, url, headers, body };
    this.recentLogs.push({ type: "Request Details", data: logEntry });
  }

  logResponse(statusCode: number, body?: object): void {
    const logEntry = { statusCode, body };
    this.recentLogs.push({ type: "Response Details", data: logEntry });
  }

  getRecentLogs(): string[] {
    const logs = this.recentLogs.map((log) => {
      return `====== ${log.type} ======\n${JSON.stringify(log.data, null, 4)}\n`;
    });
    return logs.join("\n");
  }
}
