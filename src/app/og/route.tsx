import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* 메인 아이콘 */}
        <div style={{ fontSize: 120, marginBottom: 20 }}>
          🛡️
        </div>
        
        {/* 메인 텍스트 */}
        <div style={{ 
          fontSize: 72, 
          fontWeight: 'bold', 
          marginBottom: 20,
          textAlign: 'center',
          lineHeight: 1.2
        }}>
          피싱 방지 센터
        </div>
        
        {/* 서브 텍스트 */}
        <div style={{ 
          fontSize: 32, 
          opacity: 0.9,
          textAlign: 'center',
          maxWidth: '80%',
          lineHeight: 1.3
        }}>
          안전한 디지털 환경을 만들어갑니다
        </div>
        
        {/* 하단 로고 영역 */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          fontSize: 24,
          opacity: 0.8
        }}>
          phishing-prevention.kr
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
