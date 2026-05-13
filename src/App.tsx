import { css } from '../styled-system/css'

const heroBg = '/@fs/Users/gwuisang/.gemini/antigravity/brain/a240cd33-0536-4d81-865b-556957506c87/hero_wine_background_1778668338727.png';

function App() {
  return (
    <div className={css({ minH: '100vh', bg: 'charcoal.900', color: 'white', fontFamily: 'body' })}>
      {/* Navigation */}
      <nav className={css({ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 6, bg: 'rgba(15, 15, 19, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>
        <div className={css({ fontSize: 'xl', fontWeight: 'bold', letterSpacing: 'wider', color: 'gold.500' })}>
          1879 BUSAN AI WINE SCHOOL
        </div>
        <div className={css({ display: 'flex', gap: 6, fontSize: 'sm', fontWeight: 'medium', color: 'gray.300' })}>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>프로그램</a>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>강사진</a>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>커리큘럼</a>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>고객센터</a>
        </div>
        <button className={css({ px: 5, py: 2, bg: 'wine.600', color: 'white', rounded: 'full', fontSize: 'sm', fontWeight: 'bold', _hover: { bg: 'wine.500' }, transition: 'colors', cursor: 'pointer' })}>
          지원하기
        </button>
      </nav>

      {/* Hero Section */}
      <header className={css({ position: 'relative', h: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' })}>
        <div className={css({ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 })} />
        <div className={css({ position: 'absolute', inset: 0, bgGradient: 'to-b', gradientFrom: 'transparent', gradientTo: 'charcoal.900' })} />

        <div className={css({ position: 'relative', zIndex: 10, textAlign: 'center', px: 4, animation: 'float 6s ease-in-out infinite' })}>
          <h2 className={css({ fontSize: 'xl', color: 'gold.400', mb: 4, letterSpacing: 'widest', textTransform: 'uppercase' })}>
            리더를 위한 가장 완벽한 와인 네트워크
          </h2>
          <h1 className={css({ fontSize: '6xl', fontWeight: 'extrabold', mb: 6, lineHeight: 'tight', color: 'white' })}>
            1879 부산 <span className={css({ color: 'wine.500', textShadow: '0 0 20px rgba(206, 74, 94, 0.5)' })}>AI</span> 와인 스쿨
          </h1>
          <p className={css({ fontSize: 'xl', color: 'gray.300', mb: 10, maxW: '2xl', mx: 'auto' })}>
            최첨단 AI 기술과 정통 와인의 만남. <br />
            당신의 품격을 한 차원 높여줄 특별한 경험이 시작됩니다.
          </p>
          <div className={css({ display: 'flex', justifyContent: 'center', gap: 4 })}>
            <button className={css({ px: 8, py: 4, bg: 'gold.500', color: 'charcoal.900', rounded: 'full', fontSize: 'lg', fontWeight: 'bold', _hover: { bg: 'gold.400', transform: 'scale(1.05)' }, transition: 'all', cursor: 'pointer', boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' })}>
              CEO 과정 자세히 보기
            </button>
            <button className={css({ px: 8, py: 4, bg: 'rgba(255, 255, 255, 0.1)', color: 'white', rounded: 'full', fontSize: 'lg', fontWeight: 'bold', backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'rgba(255,255,255,0.2)', _hover: { bg: 'rgba(255, 255, 255, 0.2)' }, transition: 'all', cursor: 'pointer' })}>
              상담 신청
            </button>
          </div>
        </div>
      </header>

      {/* Programs Section */}
      <section className={css({ py: 24, px: 6, maxW: '7xl', mx: 'auto' })}>
        <div className={css({ textAlign: 'center', mb: 16 })}>
          <h3 className={css({ fontSize: '3xl', fontWeight: 'bold', color: 'gold.500', mb: 4 })}>Premium Programs</h3>
          <p className={css({ color: 'gray.400' })}>최고 경영자와 전문가를 위한 맞춤형 교육 과정</p>
        </div>

        <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 8 })}>
          {[
            { title: 'CEO-BUSINESS', desc: '비즈니스에 특화된 실무형 와인 교육 및 네트워크 형성' },
            { title: 'CEO-MASTER', desc: '와인 전문가 수준의 심도 깊은 테이스팅 및 글로벌 와인 산지 연구' },
            { title: 'AI-MASTER', desc: '리더를 위한 비즈니스 AI 기술 및 트렌드 활용 심화 과정 (운영 중)' },
            { title: 'AI-Workflow', desc: '최신 AI 기술을 비즈니스 워크플로우에 접목하여 업무 효율을 극대화하는 실무 과정 (신규 개강)' },
            { title: 'Golf-Master', desc: '성공적인 비즈니스를 위한 프리미엄 골프 레슨 및 와인 네트워크 융합 과정 (운영 중)' },
          ].map((prog, idx) => (
            <div key={idx} className={css({ p: 8, bg: 'charcoal.800', rounded: '2xl', border: '1px solid', borderColor: 'charcoal.700', _hover: { borderColor: 'wine.500', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }, transition: 'all duration-300' })}>
              <div className={css({ w: 12, h: 12, bg: 'wine.900', rounded: 'full', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6, color: 'gold.500', fontSize: 'xl', fontWeight: 'bold' })}>
                {idx + 1}
              </div>
              <h4 className={css({ fontSize: 'xl', fontWeight: 'bold', mb: 3 })}>{prog.title}</h4>
              <p className={css({ color: 'gray.400', lineHeight: 'relaxed' })}>{prog.desc}</p>
              <button className={css({ mt: 6, color: 'gold.400', fontWeight: 'semibold', display: 'flex', alignItems: 'center', gap: 2, _hover: { color: 'gold.300' }, cursor: 'pointer' })}>
                더 알아보기 →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={css({ py: 12, bg: 'charcoal.900', borderTop: '1px solid', borderColor: 'charcoal.800' })}>
        <div className={css({ maxW: '7xl', mx: 'auto', px: 6, display: 'flex', flexDir: { base: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 6 })}>
          <div className={css({ color: 'gray.500', fontSize: 'sm' })}>
            <p className={css({ fontWeight: 'bold', color: 'gray.300', mb: 2 })}>1879 부산와인스쿨</p>
            <p>부산광역시 해운대구 마린시티 (가상 주소)</p>
            <p>Tel: 1588-1879 | Email: info@busanwine.com</p>
          </div>
          <div className={css({ display: 'flex', gap: 4 })}>
            <a href="http://busanwine.com" target="_blank" rel="noreferrer" className={css({ color: 'gold.600', _hover: { color: 'gold.400' }, fontSize: 'sm' })}>
              공식 홈페이지 방문
            </a>
          </div>
        </div>
        <div className={css({ textAlign: 'center', mt: 8, color: 'gray.600', fontSize: 'xs' })}>
          © 2026 1879 Busan AI Wine School. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
