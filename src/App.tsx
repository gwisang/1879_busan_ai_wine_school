import { useState, useEffect } from 'react';
import { css } from '../styled-system/css';

// Types
type Application = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
  date: string;
};

type CourseDetail = {
  title: string;
  shortDesc: string;
  description?: string;
  details?: { label: string; value: string }[];
};

const COURSES: CourseDetail[] = [
  {
    title: 'CEO-BUSINESS 과정',
    shortDesc: '비즈니스에 특화된 실무형 와인 교육 및 네트워크 형성',
    description: '와인에 대한 체계화 된 이론 교육과 시음을 통해 CEO들에게 21세기 글로벌 리더로서 갖추어야 할 기본 소양인 와인 및 테이블 매너를 익힘으로서 세련된 비즈니스를 할 수 있도록 핵심 역량을 제공하는데 목적을 두고 있습니다.',
    details: [
      { label: '교육 기간', value: '4개월 16주' },
      { label: '모집 인원', value: '40명' },
      { label: '교육 시간', value: '18:30 ~ 20:00 이론, 20:00 ~ 21:30 디너 및 테이스팅 (매주 목요일)' },
      { label: '수강료', value: '390만원(1879부산와인스쿨 동문 추천시 50만원 할인)' },
      { label: '수료증', value: 'BWS CEO-BUSINESS 수료증' }
    ]
  },
  {
    title: 'CEO-MASTER 과정',
    shortDesc: '와인 전문가 수준의 심도 깊은 테이스팅 및 글로벌 와인 산지 연구',
    description: 'CEO-MASTER 과정은 CEO-BUSINESS 과정 수료 후 좀 더 체계적이고 집중적인 와인교육을 원하는 분들을 대상으로 진행하는 심화과정입니다.\n21세기 글로벌 리더로서 갖추어야 할 기본 소양인 와인 및 테이블 매너 그 이상의 세련된 비즈니스를 할 수 있도록 핵심 역량을 제공하는데 목적을 두고 있습니다.\n심도있는 특강과 토론식 수업으로 진행되며, 매강의마다 강의 주제별로 고급와인을 선정하여 소개하고 비교 시음하게 됩니다.',
    details: [
      { label: '교육 기간', value: '8개월 (월 2회, 총 13회)' },
      { label: '모집 인원', value: '20명' },
      { label: '교육 시간', value: '18:30 ~ 20:00 이론, 20:00 ~ 21:30 디너 및 테이스팅 (매월 첫째, 셋째 화요일)' },
      { label: '수업료', value: '400만원(고급와인 테이스팅 위주)' },
      { label: '수료증', value: 'BWS 소믈리에 수료증(프랑스 와인대학 유니베르시떼 뒤 뱅 인증)' },
      { label: '수강 대상', value: '부산와인스쿨 CEO과정 졸업생' }
    ]
  },
  {
    title: 'AI-MASTER',
    shortDesc: '리더를 위한 비즈니스 AI 기술 및 트렌드 활용 심화 과정',
    description: '생성형 AI를 처음 접하는 분들도 쉽게 배울 수 있는 실습형 수업으로 이루어져 이미지 제작, 홍보 영상 제작부터 업무 보고서 작성까지 일상적인 재미와 실무 기술을 배울 수 있습니다.\n발전하는 AI를 잘 활용하여 삶의 질을 높이고 업무 능률 향상에 목적을 두고 있습니다.',
    details: [
      { label: '교육 기간', value: '8회(8주)' },
      { label: '모집 인원', value: '20명(선착순 마감)' },
      { label: '교육 시간', value: '매주 월요일 17:00 ~ 19:00' },
      { label: '수강료', value: '89만원' }
    ]
  },
  { title: 'AI-Workflow', shortDesc: '최신 AI 기술을 비즈니스 워크플로우에 접목하여 업무 효율을 극대화하는 실무 과정 (신규 개강)' },
  { title: 'Golf-Master', shortDesc: '성공적인 비즈니스를 위한 프리미엄 골프 레슨 및 와인 네트워크 융합 과정 (운영 중)' },
];

const heroBg = '/@fs/Users/gwuisang/.gemini/antigravity/brain/a240cd33-0536-4d81-865b-556957506c87/hero_wine_background_1778668338727.png';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'adminLogin' | 'adminDashboard'>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);

  // Application Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: Application = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleString()
    };
    const existing = JSON.parse(localStorage.getItem('wineApplications') || '[]');
    localStorage.setItem('wineApplications', JSON.stringify([newApp, ...existing]));

    alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', email: '', course: '', message: '' });
  };

  // Views
  if (currentView === 'adminLogin') {
    return <AdminLogin onLoginSuccess={() => setCurrentView('adminDashboard')} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'adminDashboard') {
    return <AdminDashboard onLogout={() => setCurrentView('landing')} />;
  }

  // default: landing
  return (
    <div className={css({ minH: '100vh', bg: 'charcoal.900', color: 'white', fontFamily: 'body' })}>
      {/* Navigation */}
      <nav className={css({ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 6, bg: 'rgba(15, 15, 19, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={css({ fontSize: 'xl', fontWeight: 'bold', letterSpacing: 'wider', color: 'gold.500', bg: 'transparent', border: 'none', cursor: 'pointer', p: 0 })}>
          1879 BUSAN AI•WINE SCHOOL
        </button>
        <div className={css({ display: 'flex', gap: 6, fontSize: 'sm', fontWeight: 'medium', color: 'gray.300' })}>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>스쿨소개</a>
          <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', color: 'gray.300', fontSize: 'inherit', fontWeight: 'inherit', p: 0, _hover: { color: 'gold.400' }, transition: 'colors' })}>프로그램</button>
          <a href="#" className={css({ _hover: { color: 'gold.400' }, transition: 'colors' })}>공지사항</a>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={css({ px: 5, py: 2, bg: 'wine.600', color: 'white', rounded: 'full', fontSize: 'sm', fontWeight: 'bold', _hover: { bg: 'wine.500' }, transition: 'colors', cursor: 'pointer' })}>
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
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className={css({ px: 8, py: 4, bg: 'gold.500', color: 'charcoal.900', rounded: 'full', fontSize: 'lg', fontWeight: 'bold', _hover: { bg: 'gold.400', transform: 'scale(1.05)' }, transition: 'all', cursor: 'pointer', boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' })}>
              CEO 과정 자세히 보기
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={css({ px: 8, py: 4, bg: 'rgba(255, 255, 255, 0.1)', color: 'white', rounded: 'full', fontSize: 'lg', fontWeight: 'bold', backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'rgba(255,255,255,0.2)', _hover: { bg: 'rgba(255, 255, 255, 0.2)' }, transition: 'all', cursor: 'pointer' })}>
              상담 신청
            </button>
          </div>
        </div>
      </header>

      {/* Programs Section */}
      <section id="programs" className={css({ py: 24, px: 6, maxW: '7xl', mx: 'auto' })}>
        <div className={css({ textAlign: 'center', mb: 16 })}>
          <h3 className={css({ fontSize: '3xl', fontWeight: 'bold', color: 'gold.500', mb: 4 })}>Premium Programs</h3>
          <p className={css({ color: 'gray.400' })}>최고 경영자와 전문가를 위한 맞춤형 교육 과정</p>
        </div>

        <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 8 })}>
          {COURSES.map((prog, idx) => (
            <div key={idx}
              onClick={() => {
                if (prog.description) {
                  setSelectedCourse(prog);
                }
              }}
              className={css({
                p: 8,
                bg: 'charcoal.800',
                rounded: '2xl',
                border: '1px solid',
                borderColor: 'charcoal.700',
                cursor: prog.description ? 'pointer' : 'default',
                _hover: { borderColor: 'wine.500', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' },
                transition: 'all duration-300',
                display: 'flex',
                flexDir: 'column'
              })}>
              <div className={css({ w: 12, h: 12, bg: 'wine.900', rounded: 'full', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6, color: 'gold.500', fontSize: 'xl', fontWeight: 'bold' })}>
                {idx + 1}
              </div>
              <h4 className={css({ fontSize: 'xl', fontWeight: 'bold', mb: 3 })}>{prog.title}</h4>
              <p className={css({ color: 'gray.400', lineHeight: 'relaxed', flexGrow: 1 })}>{prog.shortDesc}</p>

              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 })}>
                {prog.description && (
                  <span className={css({ color: 'gold.400', fontWeight: 'semibold', fontSize: 'sm' })}>
                    과정 안내 보기 →
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, course: prog.title }));
                    setIsModalOpen(true);
                  }}
                  className={css({ color: 'gray.300', fontSize: 'sm', display: 'flex', alignItems: 'center', gap: 2, _hover: { color: 'white' }, cursor: 'pointer', bg: 'wine.600', px: 4, py: 2, rounded: 'lg', border: 'none' })}>
                  상담 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={css({ py: 12, bg: 'charcoal.900', borderTop: '1px solid', borderColor: 'charcoal.800' })}>
        <div className={css({ maxW: '7xl', mx: 'auto', px: 6, display: 'flex', flexDir: { base: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 6 })}>
          <div className={css({ color: 'gray.500', fontSize: 'sm' })}>
            <p className={css({ fontWeight: 'bold', color: 'gray.300', mb: 2 })}>1879부산AI•와인스쿨</p>
            <p>부산광역시 동래구 연안로 58번길 7,1~2층 / 사업자번호 644-88-00754</p>
            <p>Tel: 1588-1879 | Email: info@busanwine.com</p>
          </div>
          <div className={css({ display: 'flex', gap: 4 })}>
            <button
              onClick={() => setCurrentView('adminLogin')}
              className={css({ bg: 'transparent', border: 'none', color: 'charcoal.600', _hover: { color: 'gray.500' }, cursor: 'pointer', fontSize: 'xs' })}>
              Admin
            </button>
          </div>
        </div>
        <div className={css({ textAlign: 'center', mt: 8, color: 'gray.600', fontSize: 'xs' })}>
          © 2026 1879 Busan AI Wine School. All rights reserved.
        </div>
      </footer>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className={css({ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', p: 4 })}>
          <div className={css({ bg: 'charcoal.800', p: 8, rounded: '2xl', maxW: '2xl', w: 'full', border: '1px solid', borderColor: 'charcoal.700', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxH: '90vh', overflowY: 'auto' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 })}>
              <div>
                <h3 className={css({ fontSize: '3xl', fontWeight: 'bold', color: 'gold.500', mb: 2 })}>{selectedCourse.title}</h3>
                <p className={css({ color: 'gray.400', fontSize: 'lg' })}>{selectedCourse.shortDesc}</p>
              </div>
              <button onClick={() => setSelectedCourse(null)} className={css({ color: 'gray.400', _hover: { color: 'white' }, bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2xl', ml: 4 })}>
                ✕
              </button>
            </div>

            <div className={css({ color: 'gray.300', lineHeight: 'relaxed', mb: 8, whiteSpace: 'pre-line' })}>
              {selectedCourse.description}
            </div>

            {selectedCourse.details && (
              <div className={css({ bg: 'charcoal.900', p: 6, rounded: 'xl', mb: 8 })}>
                <ul className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  {selectedCourse.details.map((detail, idx) => (
                    <li key={idx} className={css({ display: 'flex', flexDir: { base: 'column', sm: 'row' }, gap: { base: 1, sm: 4 }, borderBottom: idx !== selectedCourse.details!.length - 1 ? '1px solid' : 'none', borderColor: 'charcoal.800', pb: idx !== selectedCourse.details!.length - 1 ? 4 : 0 })}>
                      <span className={css({ color: 'gold.500', fontWeight: 'bold', minW: '100px' })}>{detail.label}</span>
                      <span className={css({ color: 'gray.300' })}>{detail.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={css({ display: 'flex', justifyContent: 'center' })}>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, course: selectedCourse.title }));
                  setSelectedCourse(null);
                  setIsModalOpen(true);
                }}
                className={css({ px: 8, py: 4, bg: 'wine.600', color: 'white', rounded: 'full', fontSize: 'lg', fontWeight: 'bold', _hover: { bg: 'wine.500', transform: 'scale(1.05)' }, transition: 'all', cursor: 'pointer', boxShadow: '0 0 20px rgba(206, 74, 94, 0.4)' })}>
                이 과정 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isModalOpen && (
        <div className={css({ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', p: 4 })}>
          <div className={css({ bg: 'charcoal.800', p: 8, rounded: '2xl', maxW: 'md', w: 'full', border: '1px solid', borderColor: 'charcoal.700', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 })}>
              <h3 className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'gold.500' })}>상담 신청하기</h3>
              <button onClick={() => setIsModalOpen(false)} className={css({ color: 'gray.400', _hover: { color: 'white' }, bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'xl' })}>
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>이름</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={css({ w: 'full', p: 3, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="홍길동" />
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>연락처</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={css({ w: 'full', p: 3, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="010-1234-5678" />
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>관심 과정</label>
                <select value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })} className={css({ w: 'full', p: 3, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })}>
                  <option value="">선택해주세요</option>
                  {COURSES.map(course => (
                    <option key={course.title} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>남기실 메시지 (선택)</label>
                <textarea rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={css({ w: 'full', p: 3, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="문의하실 내용을 적어주세요." />
              </div>
              <button type="submit" className={css({ mt: 4, w: 'full', py: 4, bg: 'wine.600', color: 'white', rounded: 'lg', fontWeight: 'bold', _hover: { bg: 'wine.500' }, transition: 'colors', cursor: 'pointer' })}>
                신청 완료
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// Admin Components
// ---------------------------------------------------------

function AdminLogin({ onLoginSuccess, onBack }: { onLoginSuccess: () => void, onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      onLoginSuccess();
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className={css({ minH: '100vh', bg: 'charcoal.900', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
      <div className={css({ bg: 'charcoal.800', p: 8, rounded: '2xl', maxW: 'sm', w: 'full', border: '1px solid', borderColor: 'charcoal.700', textAlign: 'center' })}>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'gold.500', mb: 6 })}>관리자 로그인</h2>
        <form onSubmit={handleLogin} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={css({ w: 'full', p: 3, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', textAlign: 'center' })}
          />
          {error && <p className={css({ color: 'red.400', fontSize: 'sm' })}>{error}</p>}
          <button type="submit" className={css({ py: 3, bg: 'gold.600', color: 'charcoal.900', rounded: 'lg', fontWeight: 'bold', _hover: { bg: 'gold.500' }, cursor: 'pointer' })}>
            로그인
          </button>
        </form>
        <button onClick={onBack} className={css({ mt: 6, color: 'gray.400', fontSize: 'sm', bg: 'transparent', border: 'none', cursor: 'pointer', _hover: { color: 'white' } })}>
          ← 메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wineApplications') || '[]');
    setApplications(data);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('이 신청 내역을 삭제하시겠습니까?')) {
      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      localStorage.setItem('wineApplications', JSON.stringify(updated));
    }
  };

  return (
    <div className={css({ minH: '100vh', bg: 'charcoal.900', color: 'white', p: 8 })}>
      <div className={css({ maxW: '6xl', mx: 'auto' })}>
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8 })}>
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', color: 'gold.500' })}>상담 신청 내역</h1>
          <button onClick={onLogout} className={css({ px: 4, py: 2, bg: 'charcoal.700', color: 'white', rounded: 'lg', _hover: { bg: 'charcoal.600' }, cursor: 'pointer', border: 'none' })}>
            로그아웃
          </button>
        </div>

        <div className={css({ bg: 'charcoal.800', rounded: 'xl', border: '1px solid', borderColor: 'charcoal.700', overflow: 'hidden' })}>
          {applications.length === 0 ? (
            <div className={css({ p: 12, textAlign: 'center', color: 'gray.500' })}>
              아직 들어온 신청이 없습니다.
            </div>
          ) : (
            <table className={css({ w: 'full', textAlign: 'left', borderCollapse: 'collapse' })}>
              <thead className={css({ bg: 'charcoal.950' })}>
                <tr>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>신청일시</th>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>이름</th>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>연락처</th>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>관심 과정</th>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>메시지</th>
                  <th className={css({ p: 4, color: 'gray.400', fontWeight: 'medium', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>관리</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className={css({ _hover: { bg: 'charcoal.700' }, transition: 'colors' })}>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700', fontSize: 'sm', color: 'gray.300' })}>{app.date}</td>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700', fontWeight: 'bold' })}>{app.name}</td>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700' })}>{app.phone}</td>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700', color: 'gold.400' })}>{app.course || '-'}</td>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700', maxW: 'xs', truncate: true, fontSize: 'sm', color: 'gray.300' })}>{app.message || '-'}</td>
                    <td className={css({ p: 4, borderBottom: '1px solid', borderColor: 'charcoal.700' })}>
                      <button onClick={() => handleDelete(app.id)} className={css({ color: 'red.400', fontSize: 'sm', bg: 'transparent', border: 'none', cursor: 'pointer', _hover: { color: 'red.300', textDecoration: 'underline' } })}>
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
