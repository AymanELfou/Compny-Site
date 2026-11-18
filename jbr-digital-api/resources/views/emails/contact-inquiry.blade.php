<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry - JBR Digital</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b0f19;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0b0f19;
      padding: 40px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .header {
      background: linear-gradient(135deg, #0055ff 0%, #00a3ff 100%);
      padding: 32px 28px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #ffffff;
      margin-bottom: 12px;
    }
    .content {
      padding: 32px 28px;
    }
    .section-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 16px;
      font-weight: 700;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .info-table td {
      padding: 12px 14px;
      border-bottom: 1px solid #1f2937;
      font-size: 14px;
    }
    .info-table tr:last-child td {
      border-bottom: none;
    }
    .info-label {
      width: 32%;
      color: #94a3b8;
      font-weight: 600;
    }
    .info-value {
      width: 68%;
      color: #f1f5f9;
      font-weight: 500;
    }
    .tag {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }
    .tag-company {
      background-color: rgba(0, 85, 255, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(0, 85, 255, 0.3);
    }
    .tag-individual {
      background-color: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .message-box {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-left: 4px solid #0055ff;
      border-radius: 8px;
      padding: 18px 20px;
      color: #e2e8f0;
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
      margin-top: 8px;
    }
    .action-row {
      margin-top: 28px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      background: #0055ff;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      margin: 4px;
    }
    .btn-secondary {
      background: #1e293b;
      color: #e2e8f0 !important;
      border: 1px solid #334155;
    }
    .footer {
      background: #0a0e17;
      padding: 20px 28px;
      border-top: 1px solid #1f2937;
      font-size: 12px;
      color: #64748b;
      text-align: center;
      line-height: 1.5;
    }
    .footer a {
      color: #38bdf8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- Header -->
      <div class="header">
        <span class="badge">JBR Digital &bull; Client Inquiry</span>
        <h1>New Project Submission</h1>
        <p>A potential client submitted details via the Contact Page</p>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="section-title">Client Information</div>
        <table class="info-table">
          <tr>
            <td class="info-label">Full Name</td>
            <td class="info-value"><strong>{{ $data['fullName'] ?? 'N/A' }}</strong></td>
          </tr>
          <tr>
            <td class="info-label">Client Type</td>
            <td class="info-value">
              @if(($data['clientType'] ?? '') === 'company')
                <span class="tag tag-company">Company / شركة</span>
              @else
                <span class="tag tag-individual">Individual / فرد</span>
              @endif
            </td>
          </tr>
          <tr>
            <td class="info-label">Email</td>
            <td class="info-value">
              <a href="mailto:{{ $data['email'] ?? '' }}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">
                {{ $data['email'] ?? 'N/A' }}
              </a>
            </td>
          </tr>
          <tr>
            <td class="info-label">Phone</td>
            <td class="info-value">
              <a href="tel:{{ $data['phone'] ?? '' }}" style="color: #e2e8f0; text-decoration: none;">
                {{ $data['phone'] ?? 'N/A' }}
              </a>
              @if(!empty($data['phone']))
                @php
                  $cleanPhone = preg_replace('/[^0-9]/', '', $data['phone']);
                @endphp
                <span style="margin-left: 8px;">
                  <a href="https://wa.me/{{ $cleanPhone }}" target="_blank" style="color: #22c55e; text-decoration: none; font-size: 12px; font-weight: 600;">
                    &bull; WhatsApp
                  </a>
                </span>
              @endif
            </td>
          </tr>
          <tr>
            <td class="info-label">Subject / Scope</td>
            <td class="info-value"><strong>{{ $data['subject'] ?? 'N/A' }}</strong></td>
          </tr>
        </table>

        <div class="section-title" style="margin-top: 24px;">Project Scope & Description</div>
        <div class="message-box">{{ $data['message'] ?? 'No description provided.' }}</div>

        <!-- Quick Action Buttons -->
        <div class="action-row">
          <a href="mailto:{{ $data['email'] ?? '' }}?subject={{ urlencode('Re: ' . ($data['subject'] ?? 'Project Inquiry')) }}" class="btn">
            Reply to Client Email
          </a>
          @if(!empty($data['phone']))
            <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $data['phone']) }}" class="btn btn-secondary">
              Chat on WhatsApp
            </a>
          @endif
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Received on {{ now()->format('F j, Y - H:i:s') }} UTC<br>
        Source: JBR Digital Website Contact Form &bull; Destination: <strong>{{ config('mail.from.address') }}</strong>
      </div>

    </div>
  </div>
</body>
</html>

