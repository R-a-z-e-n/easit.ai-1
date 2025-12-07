
import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Activity, Users, MessageSquare, Code, ArrowRight, Mic, Phone, Play, Terminal, Check } from 'lucide-react';
import { FooterAssistant } from './FooterAssistant';

interface LandingPageProps {
  onGetStarted: () => void;
  onEnterAsGuest: () => void;
}

const logoUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCACHAlgDASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAQDBQECBgf/xAAzEAACAgEDAwMCBAUEAwAAAAAAAQIDBBEFEiExQRNRYXGBkSIyobHBFEJS0eFC8PFiYv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHxEBAQEBAQACAgMBAAAAAAAAAAERAhIhAzFBUWEi/9oADAMBAAIRAxEAPwD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd3gXUu2NlTssnLKrqtupL02ykkkv3YHJg23OODW8fyo0XSnKl7SnJtNNbptP5Ry/i/h9/E8qOPjxUnKLk3J7JJd2wMOg9M/D3M/iK40v1TTjJODi90+qMKwAAAAAAAAAAAAAAd/hNNeXGL+aa++pxh1OEf56j/1I/UCNz/8AO5P+uX5OIOxzn+dyf9cvzZx4AAAAe3hr/ADlH/rX6nkPU8L/z1H/rX6kHN5l/nbv+uX5MFHT5n/nrv+uX5MAAAAAAAAAAAAAAB2+CX14+ZXIutajKLhpT6t+hxgdkAAAPbyb7aL50VysSnLSnKW9a+T3B6mRfhOa6LpylGTa+m/YDxQAAAA6nCP8APUf+pH6nLDqcI/z1H/qR+oHn5yv87f8A9cvzcSdjXP85f/1y/NxQAAAAAAB0+D/5+j/cvqcyA7/AA8q7Mqi66hOt1tS/wCbYy308k+jA0vPf8xf/wBkvzYkbLm2bXmZc7qIRhCSWka6I/k4wAAAAAAAAAAAAAA7/AAnGyzYV2XOEINtOWum6e3X2ONhW102RnZTqr+dM/gWzPxlJ3y/OQ9643d9Nf2/cDqcp49k4GXO/JnGqtIS9bT3bWyW3zuefm+bVn1RoopsgrU5OUnvt6fQzMjP47n1Q+u6+dUI80IOMY7/ADskvUxeYcevw66FadU/cUnHReu3XcDnAAAAAAAAAAADv8G/z9H+5fU4AHo5vk1ZubZfUpKEJNtJfJGAAD0OGY9eTm10XScYNtNp7dEzI5Hx+vhmX9S2Epw0OLUe7T8mLg+RYvH7nXfTbZK1aXJJJaX536mvyjMy8zMrrzqY0qM4t7NptPy0tx/YJvIuQ08vyIU1VKEoT1bvvuvQ0o73NeL3cXvjVKyNqlHUmo9u/bZyAAAAAAAAAAAAA6vCMuHHza77o6oRa2+G00v3Zyh6PGuNY/Ic2qrLhGzEhNtRk9nJJNrv8wdbheTXw2jJz89xjG5pQVTeW+2/Ty0jG5lyi7mmXC+6Cg4w0aU+h6/FeHccc5q9+Uo3p/DUpzk9Lfw0+3yZ+O2W8U5A8HDqjOqMpQUpN7+lvVt+fQGmwAAAd/g18Kcyud1saoaZJykvh0ZxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADp8K4ndzbK+jQ0x0uU5NdEl+5zB0uFcvyOG5Cvx0paotSi+kkBqcXh3HcPHsxcfJthkS9U0319Nv2OdxPl/EMy+7KxcRwyL5a5aI7Nvy/kjMvx7mnK7vPj9Nn8T961vffb52Zt/BuMcP5FkRlJ1XXf8AElFJKx9kn38ASfJcHDs4hPMwqcSjCeqGqOk1v3WyW/oY3IOMWcIox6smdasc4udkE91FNpJ/O632OPyrjPEeL+Jd9t18lHS3vHRP3+PUxOceR5PMsaqjIhGEYT1/Dv122A00AAAAAAAAAAAAAAAAADqcI/z1H/AKkfqcsOpwj/AD1H/qR+oHn5z/O5P+uX5uJOxzn+dyf9cvzcUAAAAAAAAB6nhf8AnqP/AFFr9TyPq8IzKsfNolbGdkVJOMY93tt09QMjmHCr+LXwuulGEpy1+nv0/wBjgG25jzu/mmNGq+iCUXrU03t+xj+P8Ay/Ooy64wya5xbaSjJNt7gd7ieT/0/jM862K+o7JU1Sfd7bN7fB4vk2Rk5t878mVrlKW7Z0Obct49Ziyw8ZyuuUlpsekUt9367djn4fGs7NhK3HxrLIR+KcYtpASNvBOPZHEfPYGVNylHSpye6k/wAnFoyrMXIhfZHS4NNP4Z2c/kPFOKYUqOHKUr5rR3a2a+W3/AGaTNy7M+93ZE9c2kmyKAAAAAAAAAAAAAAB1uE1125tcba67IvaUJtpS+GzJzOK4OfyWjCxcenHpW85Ri37zW2zb9Nu5gcJy68HPhkXQlOEW1pXd7podDh3PeO8fzfqa8W9pLVrW0Wn2e/wBwNrjeRRx/mN2Fi0whRGMlqTblvHV13279jG4dyPFwszJycyLjOerSoLW3JtP527mJfyjCnyuObCmz3m3OUWtLUnHSe++3cxc/Ohk2W2RrhBSk5aYdI7+gHT5lyW3m+TC62ChKMNGyffc1gAAAAAAAAAAAAAAB2OH8byuUZEqMSKcoq8pSekV8s2nK+PcccSxlTkZVuRe17sYvSkn/ALfX6mP4/wAwyOH5cr6K42OcNGOtrb428G9zPm/E+bZ31M/c93SKUUlFLskvAElzHh9XBsqnGulrUoa909092vwcAbHmnLrz+6FyhGEa4aVp+fQ1IAAAAAAAAdfheNbl5tUa6YzWpOTU2kkl1e/x2OQdLgvIcbg2V9ahGUnHS4t7NpoDc8c49hZfLbMDJxoxhGUopwk4yW3Ta/JH7fheFh84rwcaqMKa7IxkpNybUn13b27GNic7wcHnEc7Gqmqm5SlJJJvV+3f6n4nPeOT5RHPlRZ9Rr1aWktbW3Xf1A5HMMKnj+fZj0fBFtLd77L5OOHS5VyO7mWW8jIhGEnFRUY+iSOaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf8ADeY8S4jBKyjIv1dZ1U9yX+n3ZgAAA2PIuV8Y5PQoV0ZFrUei92Kj/wCzv+xhc25Tj8vvohTROCgnLctt3t8GswAAAAAAAAAAAAAAAADq8Gsqrz6ZW2V1rV+9PpHuupygB3uZ5tOVm2Sxyg6HLVHUUm1/pPQ8H+I8h45j0U5t0KMdS0a5aUtm/f6GgADpcv5J/3DIhZRBTUY6fefvN+rb3PPUAAAHtcY4xyTj9McnDthZCLWpr2e3zvt+5jczyPifJcT6O+m5tpqLUktMvVdTQwAAA3nHecce4dCVdVGQ9S95tRbf43OPzXl1vOc1ZdkFCShGCUX00r3MIAAAAAAAAAAAAAAAAAAAABsOKcq4/wAXvjfXVkSlFNRUoqSW3zudDmHK7ub5qyL4RhKMYxSXTaK2/JhgAAAAAANxwvmfFOD3xux6siUpJwkmoppb7/ADuZfKOUcX5fyKvLr+shCLWqMlHVJ+uw0YAAAAd/lfLMTm90b8qN9dyjGPuNJS0rbb33MPmPJMDkWNVTR9WpU2aUnGLT3877GqAAAAAAAAAAAAAADe8J5bxnhN6vxqsiVji4T1KLUe66bv1PR5fzLheVzCnNl9dGhJScWoa5J9tjQwAdfm3Iq+cZ6yKozhHSoqMttqS8nFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z';

interface NavbarProps {
    onGetStarted: () => void;
}

const Navbar = ({ onGetStarted }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logoUrl} alt="Logo" className="h-8 w-auto rounded-full" />
                    <span className="text-xl font-bold tracking-tight text-white">Easit.ai</span>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#product" className="text-sm font-medium text-gray-300 hover:text-white transition">Product</a>
                    <a href="#developers" className="text-sm font-medium text-gray-300 hover:text-white transition">Developers</a>
                    <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition">Pricing</a>
                    <a href="#company" className="text-sm font-medium text-gray-300 hover:text-white transition">Company</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button onClick={onGetStarted} className="text-sm font-medium text-white hover:text-gray-300 transition hidden md:block">
                        Login
                    </button>
                    <button onClick={onGetStarted} className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
                        Start for Free
                    </button>
                </div>
            </div>
        </header>
    );
};

interface HeroProps {
    onEnterAsGuest: () => void;
}

const Hero = ({ onEnterAsGuest }: HeroProps) => (
    <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-deep-black">
             <div className="absolute inset-0 bg-grid-pattern opacity-10 grid-bg pointer-events-none"></div>
             <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-blue">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                    </span>
                    New: Low Latency Gemini Live Support
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                    Voice AI <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                        for Developers
                    </span>
                </h1>
                <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                    Easit.ai provides the infrastructure for building voice assistants. 
                    Real-time, ultra-low latency, and capable of handling complex tasks via function calling.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <button onClick={onEnterAsGuest} className="flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-blue/90 transition shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        <Phone size={20} />
                        Talk to Easit
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/5 transition">
                        <Terminal size={20} />
                        Read Docs
                    </button>
                </div>
                <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
                    <span>Trusted by developers at</span>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {/* Mock Logos */}
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                        <div className="h-6 w-20 bg-white/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Interactive Visual / Code Block */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 transform rotate-3"></div>
                <div className="bg-glass-black backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    
                    {/* Floating Elements Animation */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-brand-blue/20 rounded-full blur-2xl animate-pulse"></div>
                    
                    {/* Visualizer Header */}
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">live_session.ts</div>
                    </div>

                    {/* Code Content */}
                    <div className="font-mono text-sm space-y-2 text-gray-300">
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">1</span>
                            <span><span className="text-purple-400">const</span> assistant = <span className="text-brand-blue">new</span> EasitAI();</span>
                        </div>
                         <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">2</span>
                            <span></span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">3</span>
                            <span><span className="text-gray-500">// Initialize real-time session</span></span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">4</span>
                            <span><span className="text-purple-400">await</span> assistant.<span className="text-yellow-400">connect</span>({'{'}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">5</span>
                            <span className="pl-4">model: <span className="text-green-400">'gemini-2.5-flash'</span>,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">6</span>
                            <span className="pl-4">voice: <span className="text-green-400">'zephyr'</span>,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">7</span>
                            <span className="pl-4">latency: <span className="text-green-400">'low'</span></span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">8</span>
                            <span>{'}'});</span>
                        </div>
                         <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">9</span>
                            <span></span>
                        </div>
                         <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">10</span>
                            <span>assistant.<span className="text-yellow-400">on</span>(<span className="text-green-400">'speech'</span>, (audio) {'=>'} {'{'}</span>
                        </div>
                         <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">11</span>
                            <span className="pl-4"><span className="text-brand-blue">player</span>.play(audio);</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 mr-4 select-none">12</span>
                            <span>{'}'});</span>
                        </div>
                    </div>

                    {/* Active Call Overlay Simulation */}
                    <div className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg flex items-center gap-4 animate-slide-up-fade-in">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 flex items-center justify-center">
                                <Mic size={18} className="text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Status</div>
                            <div className="text-sm font-semibold text-white">Listening...</div>
                        </div>
                         <div className="flex items-center gap-0.5 h-4 ml-2">
                             {[1,2,3,4,5].map(i => (
                                 <div key={i} className="w-0.5 bg-brand-blue rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children?: React.ReactNode }) => (
    <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/50 hover:bg-white/10 transition-all duration-300">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

const Features = () => (
    <section id="product" className="py-24 bg-deep-black relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for scale.</h2>
                <p className="text-gray-400 text-lg">
                    Everything you need to build production-ready voice agents.
                    Orchestrate complex workflows with natural language.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard icon={<Activity size={24} />} title="Ultra Low Latency">
                    Optimized pipelines ensure &lt;500ms response times. Feels like a natural human conversation.
                </FeatureCard>
                <FeatureCard icon={<Code size={24} />} title="Function Calling">
                    Connect your AI to external APIs. Book appointments, query databases, and control smart devices via voice.
                </FeatureCard>
                <FeatureCard icon={<ShieldCheck size={24} />} title="Enterprise Security">
                    SOC2 Type II compliant infrastructure. Your data is encrypted at rest and in transit.
                </FeatureCard>
                 <FeatureCard icon={<Users size={24} />} title="Custom Voices">
                    Clone voices or select from our premium library of hyper-realistic neural voices.
                </FeatureCard>
                 <FeatureCard icon={<Phone size={24} />} title="Telephony Integration">
                    Buy phone numbers and deploy inbound/outbound agents instantly with Twilio/Vonage support.
                </FeatureCard>
                 <FeatureCard icon={<Zap size={24} />} title="Real-time Interruptions">
                    Our model handles interruptions gracefully, allowing users to cut in just like in a real call.
                </FeatureCard>
            </div>
        </div>
    </section>
);

const PricingCard = ({ title, price, subPrice, features, highlight, buttonText, onSelect }: { title: string; price: string; subPrice?: string; features: string[]; highlight?: boolean; buttonText: string; onSelect: () => void }) => (
    <div className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${highlight ? 'border-brand-blue bg-brand-blue/5 shadow-[0_0_50px_rgba(59,130,246,0.1)]' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
        {highlight && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-brand-blue/20">
                Most Popular
            </div>
        )}
        <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-400 mb-4">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white tracking-tight">{price}</span>
            </div>
            {subPrice && <p className="text-sm text-gray-400 mt-2">{subPrice}</p>}
        </div>
        
        <div className="flex-1 mb-8">
            <ul className="space-y-4">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                        <div className="mt-1 p-0.5 rounded-full bg-brand-blue text-deep-black">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm leading-relaxed">{feat}</span>
                    </li>
                ))}
            </ul>
        </div>
        
        <button 
            onClick={onSelect}
            className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${highlight ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-white text-black hover:bg-gray-200'}`}
        >
            {buttonText}
        </button>
    </div>
);

const Pricing = ({ onGetStarted }: { onGetStarted: () => void }) => (
    <section id="pricing" className="py-32 bg-deep-black relative overflow-hidden">
        {/* Background glow for pricing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
             <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Simple, transparent pricing</h2>
                <p className="text-gray-400 text-lg">No platform fees during development. Only pay when you scale.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <PricingCard 
                    title="Pay-as-you-go" 
                    price="$0.05"
                    subPrice="per minute + provider costs"
                    highlight 
                    buttonText="Start for free"
                    features={[
                        "No monthly subscription fees",
                        "First $10 in credits free",
                        "Unlimited concurrent calls",
                        "Access to all voices & models",
                        "Provider costs passed through at cost"
                    ]}
                    onSelect={onGetStarted}
                />
                 <PricingCard 
                    title="Enterprise" 
                    price="Custom" 
                    subPrice="Volume discounts available"
                    buttonText="Contact Sales"
                    features={[
                        "Volume-based discounts",
                        "Custom concurrency limits",
                        "Dedicated support channel",
                        "Private cloud deployment",
                        "SLA guarantees",
                        "Solutions engineering support"
                    ]}
                    onSelect={() => window.location.href = 'mailto:sales@easit.ai'}
                />
            </div>
            
             <div className="mt-16 text-center">
                <p className="text-gray-500 text-sm">
                    Provider costs (Twilio, OpenAI, Deepgram, etc.) are billed directly without markup.
                </p>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1">
                     <div className="flex items-center gap-2 mb-6">
                        <img src={logoUrl} alt="Logo" className="h-6 w-auto rounded-full grayscale hover:grayscale-0 transition" />
                        <span className="text-lg font-bold text-white">Easit.ai</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Building the communication layer for the AI era.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-brand-blue">Voice AI</a></li>
                        <li><a href="#" className="hover:text-brand-blue">Phone Numbers</a></li>
                        <li><a href="#" className="hover:text-brand-blue">Pricing</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="text-white font-semibold mb-4">Developers</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-brand-blue">Documentation</a></li>
                        <li><a href="#" className="hover:text-brand-blue">API Reference</a></li>
                        <li><a href="#" className="hover:text-brand-blue">Github</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-brand-blue">About</a></li>
                        <li><a href="#" className="hover:text-brand-blue">Blog</a></li>
                        <li><a href="#" className="hover:text-brand-blue">Careers</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-gray-600">
                <p>&copy; 2024 Easit.ai Inc.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Twitter</a>
                </div>
            </div>
        </div>
    </footer>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onEnterAsGuest }) => {
    return (
        <div className="bg-deep-black text-white font-sans selection:bg-brand-blue selection:text-white">
            <Navbar onGetStarted={onGetStarted} />
            <main>
                <Hero onEnterAsGuest={onEnterAsGuest} />
                <Features />
                <Pricing onGetStarted={onGetStarted} />
            </main>
            <Footer />
            <FooterAssistant />
        </div>
    );
};
