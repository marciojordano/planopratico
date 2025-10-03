import { useState, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Sparkles, TrendingUp, BookOpen, DollarSign, Target, CheckCircle, XCircle, Award, Shield, Gift, ChevronDown } from 'lucide-react';
import { supabase } from './lib/supabase';
import { FloatingCTA } from './components/FloatingCTA';
import { CountdownTimer } from './components/CountdownTimer';
import { VacancyCounter } from './components/VacancyCounter';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+32',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const TOTAL_VACANCIES = 10;
  const REMAINING_VACANCIES = 7;
  const REGISTRATION_DEADLINE = new Date('2025-10-17T23:59:59');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const dataToSubmit = handlePhoneSubmit();

      // Save to Supabase
      const { error: submitError } = await supabase
        .from('leads')
        .insert([dataToSubmit]);

      if (submitError) throw submitError;

      // Send to webhook
      await fetch('https://hook.eu2.make.com/lfrya5ugk4x774ggccectjngfgaog788', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit)
      });

      setSubmitted(true);
    } catch (err) {
      setError('Erro ao enviar seus dados. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneSubmit = () => {
    return {
      name: formData.name,
      phone: `${formData.countryCode} ${formData.phone}`,
      email: formData.email
    };
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
      <FloatingCTA onClick={scrollToForm} />

      <CountdownTimer targetDate={REGISTRATION_DEADLINE} />

      <header className="bg-black text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://marciojordano.com/wp-content/uploads/2025/06/logo-branca_plano-pratico_fundo-transparente-e1759307759545.png"
              alt="Plano Prático"
              className="h-24 md:h-28 mx-auto"
            />
          </div>
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide animate-pulse">
              VAGAS LIMITADAS - APENAS {REMAINING_VACANCIES} RESTANTES
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              IMERSÃO PLANO PRÁTICO
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-white mb-4 font-bold">
            O Método Exato para Transformar Seu Estúdio de Estética em um Negócio Lucrativo e Escalável
          </p>
          <p className="text-lg md:text-xl text-rose-200 mb-8 font-light">
            5 horas intensivas de estratégias práticas e comprovadas
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-lg mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="text-amber-400" size={24} />
              <span>26 de Outubro (Domingo)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-amber-400" size={24} />
              <span>13h às 18h</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-amber-400" size={24} />
              <span>Presencial - Bélgica</span>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xl px-12 py-5 rounded-xl hover:from-amber-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-2xl"
          >
            Quero Garantir Minha Vaga Agora!
          </button>
        </div>
      </header>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resultados Reais da Primeira Turma
            </h2>
            <p className="text-xl text-gray-700">
              Veja o impacto que a Imersão Plano Prático teve em quem participou
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-200 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-700 font-semibold">
                das participantes recomendariam para outras profissionais
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-200 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                5/5
              </div>
              <p className="text-gray-700 font-semibold">
                Avaliação média de satisfação das participantes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-200 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                +30
              </div>
              <p className="text-gray-700 font-semibold">
                Novas estratégias práticas para implementar imediatamente
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Target className="text-rose-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Esta Imersão é Para Você Se...
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Você é dona de estúdio de estética</h3>
                  <p className="text-gray-600">E quer transformar seu negócio em uma máquina de resultados previsíveis e lucrativos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Sua agenda está vazia ou inconsistente</h3>
                  <p className="text-gray-600">E você quer aprender estratégias comprovadas para lotar sua agenda em até 60 dias</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Você é dona de negócio em outra área</h3>
                  <p className="text-gray-600">E quer transformar seu negócio em uma máquina de resultados previsíveis e lucrativos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Seu financeiro está desorganizado</h3>
                  <p className="text-gray-600">E você precisa ter clareza total sobre seus números para tomar decisões estratégicas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Esta Imersão NÃO é Para Você Se...
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <XCircle className="text-rose-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-gray-700">Você procura fórmulas mágicas sem esforço ou comprometimento</p>
              </div>
              <div className="flex items-start gap-4">
                <XCircle className="text-rose-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-gray-700">Você não está disposta a implementar o que aprenderá</p>
              </div>
              <div className="flex items-start gap-4">
                <XCircle className="text-rose-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-gray-700">Você quer apenas teoria sem aplicação prática</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            O Que Você Vai Aprender (e Implementar)
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Estratégias específicas, passo a passo, que você pode começar a usar na segunda-feira
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="bg-gradient-to-br from-amber-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-rose-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Método Agenda Cheia
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>5 estratégias para conseguir 30+ novos clientes em 60 dias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Como criar ofertas irresistíveis que vendem sozinhas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Sistema de follow-up que converte 40% mais</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Técnicas de precificação estratégica para aumentar ticket médio</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="bg-gradient-to-br from-amber-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-rose-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Academia de Treinamentos
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Como criar seu primeiro treinamento do zero (mesmo sem experiência)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Estrutura completa para cursos que vendem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Estratégias de lançamento e vendas para treinamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Como precificar e posicionar seus cursos no mercado</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="bg-gradient-to-br from-amber-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="text-rose-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Organização Financeira Total
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Sistema simples para organizar 100% do seu financeiro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Como separar finanças pessoais e empresariais corretamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Métricas essenciais que todo estúdio deve acompanhar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                  <span>Planilhas prontas e ferramentas práticas para usar no dia seguinte</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="text-amber-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Quem é o Treinador
              </h2>
            </div>
            <p className="text-xl text-gray-700">
              Profissional com resultados comprovados no mercado de estética
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-amber-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img
                    src="https://marciojordano.com/wp-content/uploads/2025/10/IMG_0822-1-scaled.jpg"
                    alt="Márcio Jordano"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-amber-300 shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Márcio Jordano</h3>
                  <p className="text-rose-600 font-semibold mb-6 text-lg">Especialista em Gestão e Vendas para Estética</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span>Mais de 4 anos de experiência no mercado de estética</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span>Já ajudou mais de +30 estúdios a aumentarem seu faturamento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span>Criador do método Plano Prático</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span>Abriu seu próprio estúdio e lotou sua agenda em menos de 60 dias</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="text-amber-500" size={28} />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Depoimentos da Primeira Turma
              </h2>
              <Sparkles className="text-amber-500" size={28} />
            </div>
            <p className="text-xl text-gray-700">
              Veja o que as participantes têm a dizer sobre a experiência
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/5aSBr2c7V30"
                  title="Depoimento Luciana Claudino"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Luciana Claudino</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/rNj5rHGvPAM"
                  title="Depoimento Iza Lima"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Iza Lima</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/MRJeUmwA7qE"
                  title="Depoimento Cassia Batista"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Cassia Batista</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/7GxMHx8q8Es"
                  title="Depoimento Thamirez Santana"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Thamirez Santana</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/UMr9wIrJrt8"
                  title="Depoimento Paula Dantas"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Paula Dantas</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/17lvJ6wad1M"
                  title="Depoimento Sacha Rebeca"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Sacha Rebeca</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/i7GDGWV9wwk"
                  title="Depoimento Rafaela"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-center text-sm">Rafaela</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="text-amber-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Como Foi a Primeira Turma
              </h2>
              <Sparkles className="text-amber-500" size={28} />
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Uma experiência transformadora que mudou a forma como essas profissionais gerenciam seus negócios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-amber-200">
              <img
                src="https://marciojordano.com/wp-content/uploads/2025/10/IMG_0825-4.jpg"
                alt="Primeira turma da Imersão Plano Prático"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-amber-200">
              <img
                src="https://marciojordano.com/wp-content/uploads/2025/10/IMG_0827-4.jpg"
                alt="Participantes da primeira turma"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <VacancyCounter totalVacancies={TOTAL_VACANCIES} remainingVacancies={REMAINING_VACANCIES} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Gift className="text-amber-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Bônus Exclusivos
              </h2>
            </div>
            <p className="text-xl text-gray-700">
              Além de todo o conteúdo da imersão, você também recebe:
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <Gift className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Planilha de Organização Financeira Completa
                  </h3>
                  <p className="text-gray-600">
                    Sistema pronto para controlar receitas, despesas e lucratividade do seu estúdio (Valor: €47)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <Gift className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Template de Ofertas Irresistíveis
                  </h3>
                  <p className="text-gray-600">
                    Modelos prontos para criar promoções que convertem mais de 30% (Valor: €37)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <Gift className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Guia Completo de Criação de Treinamentos
                  </h3>
                  <p className="text-gray-600">
                    Passo a passo detalhado para criar seu primeiro curso em 30 dias (Valor: €67)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <Gift className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Grupo de Suporte Exclusivo por 30 Dias
                  </h3>
                  <p className="text-gray-600">
                    Acesso direto aos instrutores para tirar dúvidas durante a implementação (Valor: €97)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl p-8 text-center border-2 border-amber-300">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Total em Bônus: €248
            </p>
            <p className="text-gray-700 text-lg">
              Tudo isso incluído no seu investimento de €97
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="text-green-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Garantia de Satisfação
              </h2>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="text-green-600 mx-auto mb-6" size={64} />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Risco Zero para Você
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Participe da imersão e, se nos primeiros 30 minutos você sentir que o conteúdo não é para você,
              devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.
            </p>
            <p className="text-xl font-bold text-green-800">
              Todo o risco é nosso. Todo o ganho é seu.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-700">
              Tire suas dúvidas antes de garantir sua vaga
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Preciso ter experiência prévia para participar?",
                answer: "Não! A Imersão Plano Prático foi criada tanto para donas de estúdio iniciantes quanto para as que já têm experiência. O conteúdo é adaptado para que todas possam implementar as estratégias, independente do nível atual."
              },
              {
                question: "E se eu não puder comparecer no dia?",
                answer: "Como o evento é presencial e temos apenas 10 vagas, recomendamos que confirme sua presença apenas se tiver certeza de que poderá participar. Em casos de emergência, entre em contato conosco para avaliarmos possibilidades."
              },
              {
                question: "O investimento de €97 inclui tudo?",
                answer: "Sim! O valor de €97 inclui as 5 horas de imersão presencial, todos os materiais, planilhas, templates, certificado de participação e acesso ao grupo de suporte por 30 dias. Não há custos adicionais."
              },
              {
                question: "Vou receber certificado?",
                answer: "Sim! Todas as participantes recebem certificado digital de conclusão da Imersão Plano Prático."
              },
              {
                question: "Como funcionam os 30 dias de suporte?",
                answer: "Após a imersão, você terá acesso a um grupo exclusivo no WhatsApp onde poderá tirar dúvidas diretamente com os instrutores durante a implementação das estratégias aprendidas."
              },
              {
                question: "Preciso levar notebook ou algum material?",
                answer: "Recomendamos levar um caderno para anotações. Todo material digital (planilhas, templates e guias) será enviado por e-mail após o evento."
              },
              {
                question: "A imersão é realmente presencial? Onde será?",
                answer: "Sim, é 100% presencial na Bélgica. O endereço exato será enviado por e-mail após a confirmação da sua inscrição e pagamento."
              },
              {
                question: "Posso pagar parcelado?",
                answer: "Entre em contato conosco após preencher o formulário para discutirmos opções de pagamento que se adequem à sua situação."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-rose-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`text-rose-600 flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-amber-400">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Garanta Sua Vaga Agora
              </h2>
              <p className="text-gray-600 text-lg mb-4">Investimento único e simbólico</p>

              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <span className="text-3xl md:text-4xl text-gray-400 line-through font-bold">
                    €345
                  </span>
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    70% OFF
                  </div>
                </div>
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  €97
                </div>
                <p className="text-gray-600 text-sm">
                  Valor promocional válido apenas para esta turma
                </p>
              </div>

              <div className="inline-block bg-green-100 border border-green-400 rounded-lg px-4 py-2 mb-4">
                <p className="text-green-800 font-semibold">
                  Economia de €248 + Acesso a todos os bônus
                </p>
              </div>
              <p className="text-gray-700 text-lg">
                5 horas de conteúdo transformador + €248 em bônus
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-400 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Telefone (WhatsApp) *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-400 focus:outline-none transition-colors bg-white"
                    >
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+351">🇵🇹 +351</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+56">🇨🇱 +56</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-400 focus:outline-none transition-colors"
                      placeholder="123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-rose-400 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xl py-4 rounded-xl hover:from-amber-600 hover:to-rose-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Quero Garantir Minha Vaga Agora!'}
                </button>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <p className="text-center text-blue-900 text-sm leading-relaxed">
                    <strong>Próximo passo:</strong> Após preencher o formulário, você receberá as instruções de pagamento por WhatsApp e e-mail para confirmar sua vaga.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="text-green-600" size={16} />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="text-green-600" size={16} />
                    <span>Dados Protegidos</span>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-100 border-2 border-green-400 rounded-xl p-8 mb-6">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Pré-inscrição Recebida com Sucesso!
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    Em breve entraremos em contato via WhatsApp e e-mail com as informações de pagamento para confirmar sua vaga na Imersão Plano Prático.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-6">
                  <p className="text-amber-900 font-semibold mb-2">
                    Atenção: Sua vaga só será confirmada após o pagamento!
                  </p>
                  <p className="text-amber-800 text-sm">
                    Fique atenta ao seu WhatsApp e e-mail para não perder os detalhes de pagamento e confirmação.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <img
              src="https://marciojordano.com/wp-content/uploads/2025/06/logo-branca_plano-pratico_fundo-transparente-e1759307759545.png"
              alt="Plano Prático"
              className="h-16 mx-auto mb-4"
            />
          </div>
          <p className="text-rose-200 font-semibold text-xl mb-2">
            IMERSÃO PLANO PRÁTICO
          </p>
          <p className="text-gray-400 mb-4">
            26 de Outubro, 2025 • 13h às 18h • Presencial - Bélgica
          </p>
          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Plano Prático. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;