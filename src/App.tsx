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
  {
    title: 'AI-Workflow',
    shortDesc: '최신 AI 기술을 비즈니스 워크플로우에 접목하여 업무 효율을 극대화하는 실무 과정 (신규 개강)',
    description: '본 교육 과정은 생성형 AI를 처음 접하는 분들도 기초부터 차근차근 쉽게 배울 수 있는 실습형 수업으로 이루어져 있습니다. 구글 워크스페이스와 제미나이, 클로드를 활용한 업무 자동화부터 사내 문서를 기반으로 답변하는 똑똑한 사내 검색 시스템 구축, 그리고 업종별 인터넷 홈페이지 시안 제작까지 복잡한 실무 기술을 누구나 직관적으로 이해할 수 있도록 구성했습니다.\n\n인공지능 교육 전문가가 직접 기초부터 책임 지도하므로, AI가 낯선 초보자도 난이도 걱정 없이 완벽하게 마스터할 수 있습니다. 16주간의 과정을 통해 현업 전문가의 노하우를 전수받아 업무 능률을 혁신적으로 향상시키고, 팀별로 제작한 데이터 시스템과 시안들을 회사의 실제 자산으로 안전하게 인계하는 데 목적을 두고 있습니다.',
    details: [
      { label: '교육 기간', value: '4개월 16회 과정' },
      { label: '모집 인원', value: '20명 (선착순 마감)' },
      { label: '교육 시간', value: '17:00 ~ 19:00' },
      { label: '수강료', value: '180만원(부산와인스쿨 수강생 및 동문 30만원 할인)' }
    ]
  },
  {
    title: 'Golf-Master',
    shortDesc: '성공적인 비즈니스를 위한 프리미엄 골프 레슨 및 와인 네트워크 융합 과정 (운영 중)',
    description: '1879 골프 마스터 과정은 KPGA 신용진 프로님 포함 전담 책임프로 시스템 관리 아래 인도어 연습장 맞춤형 레슨, 숏게임 집중 훈련, 실제 필드 라운딩까지 아우르는 철저한 실기 중심 커리큘럼으로 구성되어 있습니다. 교육 기간 중 골프 아카데미 내 무료 레슨을 진행해 주며 영상 분석으로 스윙을 바로 잡아줍니다.',
    details: [
      { label: '교육 기간', value: '3개월 13회 과정' },
      { label: '교육 시간', value: '매주 화요일' },
      { label: '수강료', value: '350만원' }
    ]
  }
];

const NOTICES = [
  {
    id: 1,
    title: '[안내] 1879 부산 AI 와인스쿨 2026년도 상반기 원우 모집',
    date: '2026. 05. 10',
    content: '1879 부산 AI 와인스쿨에서 2026년도 상반기 신규 원우를 모집합니다. 최고 경영자와 전문가를 위한 맞춤형 과정에 많은 관심 부탁드립니다.\n\n- 접수 기간: 2026. 05. 10 ~ 2026. 05. 31\n- 지원 방법: 홈페이지 [지원하기] 버튼 또는 하단 상담 신청 이용'
  },
  {
    id: 2,
    title: '[공지] CEO-MASTER 과정 수강료 할인 프로모션 안내',
    date: '2026. 05. 01',
    content: 'CEO-BUSINESS 과정 수료 후 CEO-MASTER 과정 등록 시, 수강료의 특별 할인을 제공하는 프로모션을 진행하고 있습니다.\n심화된 와인 테이스팅과 글로벌 네트워크 구축에 함께하세요.'
  },
  {
    id: 3,
    title: '[행사] 동문 네트워킹 와인 디너 파티 개최 안내',
    date: '2026. 04. 15',
    content: '재학생 및 졸업생 동문 여러분을 모시고 "프리미엄 와인 디너 파티"를 개최합니다.\n다양한 빈티지 와인과 함께 비즈니스 네트워킹을 다지는 귀중한 시간이 되길 바랍니다.\n\n- 일시: 2026. 06. 10(금) 19:00\n- 장소: 1879 부산와인스쿨 1층 연회장'
  }
];

const heroBg = '/hero_wine_background.png';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'adminLogin' | 'adminDashboard'>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentView !== 'landing') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    const sections = ['home', 'about', 'programs', 'notice'];
    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [currentView]);

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
      <nav className={css({ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { base: 4, md: 6 }, py: { base: 4, md: 6 }, bg: 'rgba(15, 15, 19, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'charcoal.700' })}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={css({ fontSize: { base: 'md', md: 'xl' }, fontWeight: 'bold', letterSpacing: 'wider', color: 'gold.500', bg: 'transparent', border: 'none', cursor: 'pointer', p: 0, textAlign: 'left' })}>
          1879 BUSAN AI•WINE SCHOOL
        </button>
        <div className={css({ display: { base: 'none', md: 'flex' }, gap: 8, fontSize: 'md', fontWeight: 'bold', alignItems: 'center' })}>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit', p: 0, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', color: activeSection === 'about' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'about' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none', transform: activeSection === 'about' ? 'scale(1.15)' : 'scale(1)', _hover: { color: 'gold.400' } })}>스쿨소개</button>
          <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit', p: 0, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', color: activeSection === 'programs' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'programs' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none', transform: activeSection === 'programs' ? 'scale(1.15)' : 'scale(1)', _hover: { color: 'gold.400' } })}>프로그램</button>
          <button onClick={() => document.getElementById('notice')?.scrollIntoView({ behavior: 'smooth' })} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit', p: 0, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', color: activeSection === 'notice' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'notice' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none', transform: activeSection === 'notice' ? 'scale(1.15)' : 'scale(1)', _hover: { color: 'gold.400' } })}>공지사항</button>
        </div>
        <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={css({ px: { base: 3, md: 5 }, py: { base: 1.5, md: 2 }, bg: 'wine.600', color: 'white', rounded: 'full', fontSize: { base: 'xs', md: 'sm' }, fontWeight: 'bold', _hover: { bg: 'wine.500' }, transition: 'colors', cursor: 'pointer', whiteSpace: 'nowrap' })}>
            지원하기
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={css({ display: { base: 'block', md: 'none' }, bg: 'transparent', border: 'none', color: 'gold.500', fontSize: 'xl', cursor: 'pointer', p: 1, _hover: { color: 'gold.400' } })}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={css({ position: 'absolute', top: '100%', left: 0, right: 0, bg: 'rgba(15, 15, 19, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'charcoal.700', display: { base: 'flex', md: 'none' }, flexDir: 'column', alignItems: 'center', py: 8, gap: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' })}>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'lg', fontWeight: 'bold', p: 0, transition: 'all 0.3s ease', color: activeSection === 'about' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'about' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none' })}>스쿨소개</button>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'lg', fontWeight: 'bold', p: 0, transition: 'all 0.3s ease', color: activeSection === 'programs' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'programs' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none' })}>프로그램</button>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('notice')?.scrollIntoView({ behavior: 'smooth' }); }} className={css({ bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'lg', fontWeight: 'bold', p: 0, transition: 'all 0.3s ease', color: activeSection === 'notice' ? 'gold.400' : 'gray.300', textShadow: activeSection === 'notice' ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none' })}>공지사항</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className={css({ position: 'relative', h: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' })}>
        <div className={css({ position: 'absolute', inset: 0, backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 })} />
        <div className={css({ position: 'absolute', inset: 0, bgGradient: 'to-b', gradientFrom: 'transparent', gradientTo: 'charcoal.900' })} />

        <div className={css({ position: 'relative', zIndex: 10, textAlign: 'center', px: 4, animation: 'float 6s ease-in-out infinite' })}>
          <h2 className={css({ fontSize: { base: 'sm', md: 'xl' }, color: 'gold.400', mb: { base: 2, md: 4 }, letterSpacing: 'widest', textTransform: 'uppercase' })}>
            리더를 위한 가장 완벽한 와인 네트워크
          </h2>
          <h1 className={css({ fontSize: { base: '4xl', md: '6xl' }, fontWeight: 'extrabold', mb: { base: 4, md: 6 }, lineHeight: 'tight', color: 'white', wordBreak: 'keep-all' })}>
            1879 부산 <span className={css({ color: 'wine.500', textShadow: '0 0 20px rgba(206, 74, 94, 0.5)' })}>AI</span> 와인 스쿨
          </h1>
          <p className={css({ fontSize: { base: 'md', md: 'xl' }, color: 'gray.300', mb: { base: 8, md: 10 }, maxW: '2xl', mx: 'auto', wordBreak: 'keep-all' })}>
            최첨단 AI 기술과 정통 와인의 만남. <br />
            당신의 품격을 한 차원 높여줄 특별한 경험이 시작됩니다.
          </p>
          <div className={css({ display: 'flex', flexDir: { base: 'column', sm: 'row' }, justifyContent: 'center', gap: 4 })}>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className={css({ px: { base: 6, md: 8 }, py: { base: 3, md: 4 }, bg: 'gold.500', color: 'charcoal.900', rounded: 'full', fontSize: { base: 'md', md: 'lg' }, fontWeight: 'bold', _hover: { bg: 'gold.400', transform: 'scale(1.05)' }, transition: 'all', cursor: 'pointer', boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)', w: { base: 'full', sm: 'auto' } })}>
              CEO 과정 자세히 보기
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={css({ px: { base: 6, md: 8 }, py: { base: 3, md: 4 }, bg: 'rgba(255, 255, 255, 0.1)', color: 'white', rounded: 'full', fontSize: { base: 'md', md: 'lg' }, fontWeight: 'bold', backdropFilter: 'blur(10px)', border: '1px solid', borderColor: 'rgba(255,255,255,0.2)', _hover: { bg: 'rgba(255, 255, 255, 0.2)' }, transition: 'all', cursor: 'pointer', w: { base: 'full', sm: 'auto' } })}>
              상담 신청
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className={css({ py: { base: 16, md: 24 }, px: { base: 4, md: 6 }, maxW: '4xl', mx: 'auto', textAlign: 'center', lineHeight: 'loose', color: 'gray.300', fontSize: { base: 'md', md: 'lg' }, wordBreak: 'keep-all' })}>
        <h3 className={css({ fontSize: { base: '2xl', md: '3xl' }, fontWeight: 'bold', color: 'gold.500', mb: { base: 8, md: 12 } })}>About 1879부산AI•와인스쿨</h3>
        <p className={css({ mb: 6 })}>
          <span className={css({ color: 'wine.400', fontWeight: 'bold' })}>1879부산AI•와인스쿨</span>은 부산,경남지역의 와인문화 선도를 위해<br className={css({ display: { base: 'none', md: 'block' } })} />
          2006년 11월11일 개원한 부산 최초의 사설와인&nbsp;교육기관입니다.
        </p>
        <p className={css({ mb: 6 })}>
          1879부산AI•와인스쿨의 교육 프로그램은 지난 18년간 <span className={css({ color: 'wine.400', fontWeight: 'bold' })}>최고 수준의 프로그램</span>임을<br className={css({ display: { base: 'none', md: 'block' } })} />
          보여주었고, 와인교육의 글로벌화를 추진해 오던 중 세계적 권위의<br className={css({ display: { base: 'none', md: 'block' } })} />
          프랑스 와인 전문대학 'Universite du Vin'과의 국제학술협력으로<br className={css({ display: { base: 'none', md: 'block' } })} />
          새로운 도약의 발판을 마련하여 <span className={css({ color: 'wine.400', fontWeight: 'bold' })}>국내의 와인발전과 와인산업의 리더</span>로<br className={css({ display: { base: 'none', md: 'block' } })} />
          우뚝 서게&nbsp;되었습니다.
        </p>
        <p className={css({ mb: 6 })}>
          이와 함께 CEO-BUSINESS 과정 1300여명 원우들의 <span className={css({ color: 'wine.400', fontWeight: 'bold' })}>탄탄한 비즈니스<br className={css({ display: { base: 'none', md: 'block' } })} />
            네트워킹</span>을 바탕으로 명실상부한 부산 최고의 와인스쿨로 자리매김 해오고&nbsp;있습니다.
        </p>
        <p className={css({ mb: 6 })}>
          1879부산AI•와인스쿨에서는 최신 트렌드의 글로벌 와인문화와 지식과 함께<br className={css({ display: { base: 'none', md: 'block' } })} />
          정규과정 외 다양한 활동을 통한 교류기회를 제공함으로써 비즈니스에서도<br className={css({ display: { base: 'none', md: 'block' } })} />
          <span className={css({ color: 'wine.400', fontWeight: 'bold' })}>수준 높은 인적 네트워크</span>를 통한 폭넓은 커뮤니티의 장이 될 것으로&nbsp;기대합니다.
        </p>
        <p>
          앞으로도 1879부산AI•와인스쿨은 여러분들이 와인을 통해 삶의 질을 높이고<br className={css({ display: { base: 'none', md: 'block' } })} />
          큰 인적 네트워크로 성장해 가기를 진심으로&nbsp;기원합니다.
        </p>
      </section>

      {/* Programs Section */}
      <section id="programs" className={css({ py: { base: 16, md: 24 }, px: { base: 4, md: 6 }, maxW: '7xl', mx: 'auto' })}>
        <div className={css({ textAlign: 'center', mb: { base: 10, md: 16 } })}>
          <h3 className={css({ fontSize: { base: '2xl', md: '3xl' }, fontWeight: 'bold', color: 'gold.500', mb: { base: 2, md: 4 } })}>Premium Programs</h3>
          <p className={css({ color: 'gray.400', fontSize: { base: 'sm', md: 'md' }, wordBreak: 'keep-all' })}>최고 경영자와 전문가를 위한 맞춤형 교육 과정</p>
        </div>

        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(auto-fit, minmax(300px, 1fr))' }, gap: { base: 6, md: 8 } })}>
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

      {/* Notice Section */}
      <section id="notice" className={css({ py: { base: 16, md: 24 }, px: { base: 4, md: 6 }, maxW: '4xl', mx: 'auto' })}>
        <div className={css({ textAlign: 'center', mb: { base: 10, md: 16 } })}>
          <h3 className={css({ fontSize: { base: '2xl', md: '3xl' }, fontWeight: 'bold', color: 'gold.500', mb: { base: 2, md: 4 } })}>Notice & News</h3>
          <p className={css({ color: 'gray.400', fontSize: { base: 'sm', md: 'md' }, wordBreak: 'keep-all' })}>부산와인스쿨의 주요 공지와 소식을 확인하세요</p>
        </div>

        <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
          {NOTICES.map(notice => (
            <div key={notice.id} className={css({ bg: 'charcoal.800', rounded: 'xl', border: '1px solid', borderColor: 'charcoal.700', overflow: 'hidden', transition: 'all 0.3s ease' })}>
              <button
                onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                className={css({ w: 'full', textAlign: 'left', p: { base: 5, md: 6 }, bg: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', _hover: { bg: 'charcoal.700' } })}>
                <div className={css({ display: 'flex', flexDir: 'column', gap: 2 })}>
                  <span className={css({ fontSize: { base: 'md', md: 'lg' }, fontWeight: 'bold' })}>{notice.title}</span>
                  <span className={css({ fontSize: 'sm', color: 'gold.500' })}>{notice.date}</span>
                </div>
                <span className={css({ color: 'gray.400', fontSize: 'xl', transform: expandedNotice === notice.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' })}>▼</span>
              </button>
              {expandedNotice === notice.id && (
                <div className={css({ p: { base: 5, md: 6 }, pt: 0, color: 'gray.300', fontSize: { base: 'sm', md: 'md' }, lineHeight: 'relaxed', whiteSpace: 'pre-line', wordBreak: 'keep-all', borderTop: '1px solid', borderColor: 'charcoal.700', mt: 4 })}>
                  {notice.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={css({ py: { base: 8, md: 12 }, bg: 'charcoal.900', borderTop: '1px solid', borderColor: 'charcoal.800' })}>
        <div className={css({ maxW: '7xl', mx: 'auto', px: { base: 4, md: 6 }, display: 'flex', flexDir: { base: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { base: 'flex-start', md: 'center' }, gap: 6 })}>
          <div className={css({ color: 'gray.500', fontSize: { base: 'xs', md: 'sm' }, lineHeight: 'relaxed', wordBreak: 'keep-all' })}>
            <p className={css({ fontWeight: 'bold', color: 'gray.300', mb: 2, fontSize: { base: 'sm', md: 'md' } })}>1879부산AI•와인스쿨</p>
            <p>부산광역시 동래구 연안로 58번길 7, 1~2층 / 사업자번호 644-88-00754</p>
            <p>Tel: 1588-1879 | Email: info@busanwine.com</p>
          </div>
          <div className={css({ display: 'flex', gap: 4, alignSelf: { base: 'flex-start', md: 'auto' } })}>
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
          <div className={css({ bg: 'charcoal.800', p: { base: 5, md: 8 }, rounded: '2xl', maxW: '2xl', w: 'full', border: '1px solid', borderColor: 'charcoal.700', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxH: '90vh', overflowY: 'auto' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { base: 4, md: 6 } })}>
              <div>
                <h3 className={css({ fontSize: { base: 'xl', md: '3xl' }, fontWeight: 'bold', color: 'gold.500', mb: 2, wordBreak: 'keep-all' })}>{selectedCourse.title}</h3>
                <p className={css({ color: 'gray.400', fontSize: { base: 'sm', md: 'lg' }, wordBreak: 'keep-all' })}>{selectedCourse.shortDesc}</p>
              </div>
              <button onClick={() => setSelectedCourse(null)} className={css({ color: 'gray.400', _hover: { color: 'white' }, bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: { base: 'xl', md: '2xl' }, ml: 2 })}>
                ✕
              </button>
            </div>

            <div className={css({ color: 'gray.300', fontSize: { base: 'sm', md: 'md' }, lineHeight: 'relaxed', mb: { base: 6, md: 8 }, whiteSpace: 'pre-line', wordBreak: 'keep-all' })}>
              {selectedCourse.description}
            </div>

            {selectedCourse.details && (
              <div className={css({ bg: 'charcoal.900', p: { base: 4, md: 6 }, rounded: 'xl', mb: { base: 6, md: 8 } })}>
                <ul className={css({ display: 'flex', flexDir: 'column', gap: { base: 3, md: 4 } })}>
                  {selectedCourse.details.map((detail, idx) => (
                    <li key={idx} className={css({ display: 'flex', flexDir: { base: 'column', sm: 'row' }, gap: { base: 1, sm: 4 }, borderBottom: idx !== selectedCourse.details!.length - 1 ? '1px solid' : 'none', borderColor: 'charcoal.800', pb: idx !== selectedCourse.details!.length - 1 ? { base: 3, md: 4 } : 0, fontSize: { base: 'sm', md: 'md' } })}>
                      <span className={css({ color: 'gold.500', fontWeight: 'bold', minW: '100px' })}>{detail.label}</span>
                      <span className={css({ color: 'gray.300', wordBreak: 'keep-all' })}>{detail.value}</span>
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
                className={css({ px: { base: 6, md: 8 }, py: { base: 3, md: 4 }, bg: 'wine.600', color: 'white', rounded: 'full', fontSize: { base: 'md', md: 'lg' }, fontWeight: 'bold', _hover: { bg: 'wine.500', transform: 'scale(1.05)' }, transition: 'all', cursor: 'pointer', boxShadow: '0 0 20px rgba(206, 74, 94, 0.4)', w: { base: 'full', sm: 'auto' } })}>
                이 과정 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isModalOpen && (
        <div className={css({ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', p: 4 })}>
          <div className={css({ bg: 'charcoal.800', p: { base: 6, md: 8 }, rounded: '2xl', maxW: 'md', w: 'full', border: '1px solid', borderColor: 'charcoal.700', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxH: '90vh', overflowY: 'auto' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { base: 4, md: 6 } })}>
              <h3 className={css({ fontSize: { base: 'xl', md: '2xl' }, fontWeight: 'bold', color: 'gold.500' })}>상담 신청하기</h3>
              <button onClick={() => setIsModalOpen(false)} className={css({ color: 'gray.400', _hover: { color: 'white' }, bg: 'transparent', border: 'none', cursor: 'pointer', fontSize: 'xl' })}>
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className={css({ display: 'flex', flexDir: 'column', gap: { base: 3, md: 4 } })}>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>이름</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={css({ w: 'full', p: { base: 2.5, md: 3 }, fontSize: { base: 'sm', md: 'md' }, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="홍길동" />
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>연락처</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={css({ w: 'full', p: { base: 2.5, md: 3 }, fontSize: { base: 'sm', md: 'md' }, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="010-1234-5678" />
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>관심 과정</label>
                <select value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })} className={css({ w: 'full', p: { base: 2.5, md: 3 }, fontSize: { base: 'sm', md: 'md' }, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })}>
                  <option value="">선택해주세요</option>
                  {COURSES.map(course => (
                    <option key={course.title} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={css({ display: 'block', mb: 1, fontSize: 'sm', color: 'gray.300' })}>남기실 메시지 (선택)</label>
                <textarea rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={css({ w: 'full', p: { base: 2.5, md: 3 }, fontSize: { base: 'sm', md: 'md' }, bg: 'charcoal.900', border: '1px solid', borderColor: 'charcoal.600', rounded: 'lg', color: 'white', _focus: { outline: 'none', borderColor: 'gold.500' } })} placeholder="문의하실 내용을 적어주세요." />
              </div>
              <button type="submit" className={css({ mt: { base: 2, md: 4 }, w: 'full', py: { base: 3, md: 4 }, bg: 'wine.600', color: 'white', rounded: 'lg', fontWeight: 'bold', fontSize: { base: 'md', md: 'lg' }, _hover: { bg: 'wine.500' }, transition: 'colors', cursor: 'pointer' })}>
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
