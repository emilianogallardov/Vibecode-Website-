/**
 * Audit Logging System
 *
 * Logs security-sensitive operations for compliance and debugging.
 * In production, these should be sent to a logging service (e.g., Datadog, LogRocket, Sentry).
 */

export type AuditEventType =
  | 'user.created'
  | 'user.login'
  | 'user.logout'
  | 'user.password_changed'
  | 'user.email_changed'
  | 'user.deleted'
  | 'user.role_changed'
  | 'auth.failed_login'
  | 'auth.mfa_enabled'
  | 'auth.mfa_disabled'
  | 'security.rate_limit_exceeded'
  | 'security.captcha_failed'
  | 'security.suspicious_activity'
  | 'data.export'
  | 'data.import'
  | 'admin.action';

export interface AuditLogEntry {
  timestamp: Date;
  event: AuditEventType;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  success: boolean;
}

/**
 * Log an audit event
 */
export async function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> {
  const auditEntry: AuditLogEntry = {
    ...entry,
    timestamp: new Date(),
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('📋 [Audit Log]', JSON.stringify(auditEntry, null, 2));
    return;
  }

  // In production, send to logging service
  try {
    // TODO: Send to your logging service (Datadog, LogRocket, Sentry, etc.)
    // Example:
    // await fetch('https://your-logging-service.com/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(auditEntry),
    // });

    // For now, log to console in production (replace with actual service)
    console.log('[Audit]', JSON.stringify(auditEntry));
  } catch (error) {
    // Never fail the operation due to logging errors
    console.error('Failed to log audit event:', error);
  }
}

/**
 * Helper to extract IP and User-Agent from Next.js request
 */
export function getRequestMetadata(request: Request | { headers: Headers }) {
  const headers = request.headers;

  // Get IP address (handle various proxy headers)
  const forwarded = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const vercelIp = headers.get('x-vercel-forwarded-for');

  const ipAddress =
    vercelIp?.split(',')[0]?.trim() ||
    forwarded?.split(',')[0]?.trim() ||
    realIp ||
    'unknown';

  const userAgent = headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}

/**
 * Audit logger for authentication events
 */
export const auditAuth = {
  login: async (userId: string, email: string, request: Request) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'user.login',
      userId,
      userEmail: email,
      ipAddress,
      userAgent,
      severity: 'medium',
      success: true,
    });
  },

  failedLogin: async (email: string, request: Request, reason?: string) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'auth.failed_login',
      userEmail: email,
      ipAddress,
      userAgent,
      details: { reason },
      severity: 'high',
      success: false,
    });
  },

  logout: async (userId: string, email: string) => {
    await logAuditEvent({
      event: 'user.logout',
      userId,
      userEmail: email,
      severity: 'low',
      success: true,
    });
  },

  passwordChanged: async (userId: string, email: string, request: Request) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'user.password_changed',
      userId,
      userEmail: email,
      ipAddress,
      userAgent,
      severity: 'high',
      success: true,
    });
  },
};

/**
 * Audit logger for user management events
 */
export const auditUser = {
  created: async (userId: string, email: string, request: Request) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'user.created',
      userId,
      userEmail: email,
      ipAddress,
      userAgent,
      severity: 'medium',
      success: true,
    });
  },

  deleted: async (userId: string, email: string, deletedBy?: string) => {
    await logAuditEvent({
      event: 'user.deleted',
      userId,
      userEmail: email,
      details: { deletedBy },
      severity: 'high',
      success: true,
    });
  },

  roleChanged: async (
    userId: string,
    email: string,
    oldRole: string,
    newRole: string,
    changedBy: string
  ) => {
    await logAuditEvent({
      event: 'user.role_changed',
      userId,
      userEmail: email,
      details: { oldRole, newRole, changedBy },
      severity: 'critical',
      success: true,
    });
  },
};

/**
 * Audit logger for security events
 */
export const auditSecurity = {
  rateLimitExceeded: async (identifier: string, request: Request, endpoint: string) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'security.rate_limit_exceeded',
      ipAddress,
      userAgent,
      details: { identifier, endpoint },
      severity: 'medium',
      success: false,
    });
  },

  captchaFailed: async (request: Request, token?: string) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'security.captcha_failed',
      ipAddress,
      userAgent,
      details: { tokenProvided: !!token },
      severity: 'medium',
      success: false,
    });
  },

  suspiciousActivity: async (
    request: Request,
    reason: string,
    details?: Record<string, any>
  ) => {
    const { ipAddress, userAgent } = getRequestMetadata(request);
    await logAuditEvent({
      event: 'security.suspicious_activity',
      ipAddress,
      userAgent,
      details: { reason, ...details },
      severity: 'high',
      success: false,
    });
  },
};

/**
 * Audit logger for data operations
 */
export const auditData = {
  export: async (userId: string, email: string, dataType: string, recordCount: number) => {
    await logAuditEvent({
      event: 'data.export',
      userId,
      userEmail: email,
      details: { dataType, recordCount },
      severity: 'high',
      success: true,
    });
  },

  import: async (userId: string, email: string, dataType: string, recordCount: number) => {
    await logAuditEvent({
      event: 'data.import',
      userId,
      userEmail: email,
      details: { dataType, recordCount },
      severity: 'high',
      success: true,
    });
  },
};
