import React, { useState, useRef, useEffect } from 'react';

const MentalWellnessApp = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathProgress, setBreathProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);
  const [currentMood, setCurrentMood] = useState('');

  // Sample culturally relevant resources for Indian youth
  const resources = [
    {
      title: "Understanding Anxiety",
      description: "Visual guide to anxiety symptoms and instant relief techniques",
      imagePrompt: "Animated infographic showing anxiety symptoms and breathing exercises"
    },
    {
      title: "Academic Pressure Relief",
      description: "Visual strategies for exam stress management",
      imagePrompt: "Animated study techniques and stress relief visual guide"
    },
    {
      title: "Building Resilience",
      description: "Visual journey of emotional strength development",
      imagePrompt: "Animated growth journey from struggle to strength"
    },
    {
      title: "Breaking Stigma",
      description: "Visual stories of mental health awareness",
      imagePrompt: "Animated storytelling of mental health acceptance in Indian society"
    }
  ];

  // Emergency contacts specifically for India
  const emergencyContacts = [
    { name: "Vandrevala Foundation", number: "1860-266-2345", hours: "24/7" },
    { name: "iCall", number: "9152987821", hours: "10AM-8PM Mon-Sat" },
    { name: "SNEHA", number: "044-24640050", hours: "10AM-8PM" },
    { name: "Parivarthan", number: "+91-7676602602", hours: "1PM-10PM" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response (in a real app, this would call the Google Cloud AI)
  const getAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Basic empathetic responses (in a real app, these would come from Google's generative AI)
    const responses = [
      "I hear you, and I want you to know that your feelings are completely valid. Many students experience similar challenges.",
      "Thank you for sharing that with me. It takes courage to open up about how you're feeling.",
      "I understand this might be difficult to talk about. Would you like to explore some coping strategies that might help?",
      "You're not alone in feeling this way. Many young people in India face similar pressures and worries.",
      "I appreciate you trusting me with this. Let's work together to find ways to support your mental wellbeing."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    const aiResponse = await getAIResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  const startBreathingExercise = () => {
    setBreathingActive(true);
    setBreathPhase('inhale');
    setBreathProgress(0);
    
    const breathInterval = setInterval(() => {
      setBreathProgress(prev => {
        if (prev >= 100) {
          setBreathPhase(current => {
            if (current === 'inhale') {
              return 'hold';
            } else if (current === 'hold') {
              return 'exhale';
            } else {
              return 'inhale';
            }
          });
          return 0;
        }
        return prev + 5;
      });
    }, 200);
    
    // Stop after 2 minutes
    setTimeout(() => {
      clearInterval(breathInterval);
      setBreathingActive(false);
    }, 120000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Mind Bloom</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentView('welcome')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === 'welcome' 
                ? 'bg-primary text-white shadow-lg transform scale-105' 
                : 'bg-white/80 text-foreground hover:bg-white hover:shadow-md'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('chat')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === 'chat' 
                ? 'bg-primary text-white shadow-lg transform scale-105' 
                : 'bg-white/80 text-foreground hover:bg-white hover:shadow-md'
            }`}
          >
            Talk
          </button>
          <button 
            onClick={() => setCurrentView('resources')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === 'resources' 
                ? 'bg-primary text-white shadow-lg transform scale-105' 
                : 'bg-white/80 text-foreground hover:bg-white hover:shadow-md'
            }`}
          >
            Resources
          </button>
          <button 
            onClick={() => setCurrentView('mood')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === 'mood' 
                ? 'bg-primary text-white shadow-lg transform scale-105' 
                : 'bg-white/80 text-foreground hover:bg-white hover:shadow-md'
            }`}
          >
            Mood Journal
          </button>
          <button 
            onClick={() => setCurrentView('emergency')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === 'emergency' 
                ? 'bg-red-500 text-white shadow-lg transform scale-105' 
                : 'bg-white/80 text-foreground hover:bg-red-50 hover:text-red-600 hover:shadow-md'
            }`}
          >
            Emergency
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome View */}
        {currentView === 'welcome' && (
          <div className="text-center space-y-8">
            <div className="bg-white rounded-xl shadow-xl p-8" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
              <h2 className="text-3xl font-bold text-primary mb-4">Your Safe Space for Mental Wellness</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A confidential, AI-powered companion to support your mental health journey. 
                Designed specifically for Indian youth facing academic and social pressures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img 
                      src="https://placeholder-image-service.onrender.com/image/64x64?prompt=Simple icon representing confidential chat with lock symbol&id=chat-icon-001" 
                      alt="Private conversation icon with lock symbol representing confidentiality" 
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">100% Confidential</h3>
                  <p className="text-sm text-muted-foreground">Your conversations are private and anonymous</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg shadow-md" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img 
                      src="https://placeholder-image-service.onrender.com/image/64x64?prompt=AI technology icon with brain and sparkles&id=ai-icon-002" 
                      alt="AI technology icon with brain and digital elements representing intelligent support" 
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Support</h3>
                  <p className="text-sm text-muted-foreground">Trained to understand cultural context and pressures</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg shadow-md" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img 
                      src="https://placeholder-image-service.onrender.com/image/64x64?prompt=Indian youth icon with diverse group of students&id=group-icon-003" 
                      alt="Diverse group of Indian students supporting each other" 
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Culturally Sensitive</h3>
                  <p className="text-sm text-muted-foreground">Designed specifically for Indian youth context</p>
                </div>
              </div>
              
              <div className="mt-10 space-y-4">
                <button 
                  onClick={() => setCurrentView('chat')}
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
                  style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                >
                  Start Talking
                </button>
                <div>
                  <button 
                    onClick={startBreathingExercise}
                    className="text-accent hover:text-accent/80 font-medium py-2 px-4 rounded-lg transition-colors shadow-md"
                    style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                  >
                    Need to calm down? Try a breathing exercise
                  </button>
                </div>
              </div>
            </div>
            
            {/* Breathing Exercise Modal */}
            {breathingActive && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold text-center mb-6">Breathing Exercise</h3>
                  
                  <div className="w-48 h-48 mx-auto mb-6 relative">
                    <div className="w-full h-full rounded-full border-4 border-blue-200 flex items-center justify-center">
                      <div 
                        className="bg-blue-500 rounded-full transition-all duration-200"
                        style={{ 
                          width: `${breathPhase === 'inhale' ? breathProgress : breathPhase === 'hold' ? 100 : 100-breathProgress}%`, 
                          height: `${breathPhase === 'inhale' ? breathProgress : breathPhase === 'hold' ? 100 : 100-breathProgress}%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {breathPhase === 'inhale' && 'Breathe In'}
                        {breathPhase === 'hold' && 'Hold'}
                        {breathPhase === 'exhale' && 'Breathe Out'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-center text-muted-foreground mb-6">
                    Follow the circle - breathe in as it expands, hold when full, breathe out as it contracts.
                  </p>
                  
                  <button 
                    onClick={() => setBreathingActive(false)}
                    className="w-full bg-primary text-white py-2 rounded-lg font-medium"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Chat View */}
        {currentView === 'chat' && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden h-[600px] flex flex-col" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
            <div className="p-4 border-b bg-secondary">
              <h2 className="text-xl font-semibold">Confidential Chat</h2>
              <p className="text-sm text-muted-foreground">Your conversation is private and anonymous</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <img 
                      src="https://placeholder-image-service.onrender.com/image/80x80?prompt=Friendly empathetic AI companion with comforting expression&id=chat-bot-avatar-001" 
                      alt="Empathetic AI companion ready to listen with compassion" 
                      className="w-12 h-12"
                    />
                  </div>
                  <p className="text-lg font-medium text-primary mb-2">Hello! I'm here to listen and support you.</p>
                  <p className="text-muted-foreground mb-6">What would you like to talk about today?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                    <button 
                      onClick={() => setInputMessage("I'm feeling stressed about studies")}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm transition-colors shadow-sm"
                      style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                    >
                      📚 Academic stress
                    </button>
                    <button 
                      onClick={() => setInputMessage("I've been feeling anxious lately")}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg text-sm transition-colors shadow-sm"
                      style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                    >
                      😟 Anxiety & worries
                    </button>
                    <button 
                      onClick={() => setInputMessage("I'm struggling with relationships")}
                      className="bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-3 rounded-lg text-sm transition-colors shadow-sm"
                      style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                    >
                      💕 Relationships
                    </button>
                    <button 
                      onClick={() => setInputMessage("I need help with my mood")}
                      className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm transition-colors shadow-sm"
                      style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                    >
                      🌟 Mood support
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 ${
                          message.role === 'user'
                            ? 'bg-primary text-white ml-8'
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 text-foreground mr-8'
                        }`}
                        style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                              <img 
                                src="https://placeholder-image-service.onrender.com/image/16x16?prompt=Tiny AI assistant icon&id=mini-bot-icon-002" 
                                alt="AI assistant icon" 
                                className="w-3 h-3"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">Mind Bloom AI</span>
                          </div>
                        )}
                        <p className="leading-relaxed">{message.content}</p>
                        {message.role === 'assistant' && (
                          <div className="flex space-x-2 mt-3">
                            <button className="text-xs bg-white px-2 py-1 rounded-full text-primary border shadow-sm"
                    style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                              👍 Helpful
                            </button>
                            <button className="text-xs bg-white px-2 py-1 rounded-full text-primary border shadow-sm"
                    style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                              💬 More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t bg-white">
        <div className="flex items-center space-x-2 mb-2">
          <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm3.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L10 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z"/>
            </svg>
          </button>
          <div className="flex space-x-1">
            {['😊', '😢', '😡', '😴', '😌', '😓'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setInputMessage(prev => prev + emoji)}
                className="text-lg hover:bg-secondary rounded p-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Share what's on your mind..."
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-primary text-white px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </div>
      </div>
          </div>
        )}
        
        {/* Resources View */}
        {currentView === 'resources' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-xl p-6" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
              <h2 className="text-2xl font-bold text-primary mb-6">Visual Wellness Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl group cursor-pointer shadow-lg" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={`https://placeholder-image-service.onrender.com/image/500x400?prompt=${encodeURIComponent(resource.imagePrompt)}&id=resource-${index}`}
                        alt={resource.imagePrompt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div>
                          <h3 className="font-bold text-white text-lg mb-1">{resource.title}</h3>
                          <p className="text-white/90 text-sm">{resource.description}</p>
                        </div>
                      </div>
                      
                      {/* Animated play button */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Hover animation effect */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Animated wellness tips carousel */}
              <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow-md" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                <h3 className="font-semibold text-lg mb-4 text-primary">Daily Wellness Tips</h3>
                <div className="relative overflow-hidden h-32">
                  <div className="animate-pulse-slow absolute inset-0 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm">Take 5 deep breaths when feeling stressed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm">Connect with friends for 15 minutes daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-6" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
              <h2 className="text-2xl font-bold text-primary mb-6">Emergency Contacts</h2>
              <p className="text-muted-foreground mb-4">
                If you're in crisis or need immediate support, these helplines offer confidential support:
              </p>
              
              
            </div>
          </div>
        )}
        
        {/* Mood Journal View */}
        {currentView === 'mood' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-xl p-6" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
              <h2 className="text-2xl font-bold text-primary mb-6">Mood Journal</h2>
              
              {/* Mood Selection with Animation */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                {[
                  { emoji: '😢', label: 'Sad', color: 'bg-blue-100' },
                  { emoji: '😡', label: 'Angry', color: 'bg-red-100' },
                  { emoji: '😴', label: 'Tired', color: 'bg-purple-100' },
                  { emoji: '😊', label: 'Happy', color: 'bg-green-100' },
                  { emoji: '😌', label: 'Calm', color: 'bg-yellow-100' }
                ].map((mood, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentMood(mood.label)}
                    className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                      currentMood === mood.label ? 'ring-4 ring-primary/50 transform scale-110' : ''
                    } ${mood.color} shadow-md`}
                    style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="text-sm font-medium">{mood.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Mood Visualization Chart */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-md" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                <h3 className="font-semibold text-lg mb-4 text-primary">Weekly Mood Patterns</h3>
                <div className="h-48 relative">
                  {/* Sample mood chart visualization */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/50 rounded-lg shadow-inner" style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                    {[60, 40, 70, 30, 80, 50, 90].map((height, index) => (
                      <div
                        key={index}
                        className="absolute bottom-0 w-8 bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                        style={{
                          height: `${height}%`,
                          left: `${index * 14 + 10}%`,
                          animation: `growHeight 0.5s ease-in-out ${index * 0.1}s forwards`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Add Journal Entry */}
              <div className="mt-6">
                <textarea
                  placeholder="Add any notes about your mood today..."
                  className="w-full border rounded-lg p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="mt-3 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md"
                style={{boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)'}}>
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Emergency Contacts View */}
        {currentView === 'emergency' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="https://placeholder-image-service.onrender.com/image/48x48?prompt=Emergency support icon with red cross and hands&id=emergency-icon-001" 
                  alt="Emergency support and immediate help icon" 
                  className="w-10 h-10"
                />
              </div>
              <h2 className="text-3xl font-bold text-red-600 mb-4">Immediate Support</h2>
              <p className="text-muted-foreground mb-8">
                If you're in crisis or need urgent help, these services are available 24/7
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border-2 border-red-100 rounded-xl p-6 hover:shadow-lg hover:border-red-200 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <img 
                          src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Phone icon for emergency contact&id=phone-icon-00${index+1}" 
                          alt="Emergency phone contact icon" 
                          className="w-6 h-6"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{contact.name}</h3>
                    </div>
                    <div className="text-left space-y-2">
                      <div className="flex items-center">
                        <span className="text-red-600 font-semibold text-lg">{contact.number}</span>
                        <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                          {contact.hours}
                        </span>
                      </div>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium mt-3 transition-colors flex items-center justify-center">
                        <img 
                          src="https://placeholder-image-service.onrender.com/image/16x16?prompt=Call icon white color&id=call-icon-00${index+1}" 
                          alt="Call now icon" 
                          className="w-4 h-4 mr-2"
                        />
                        Call Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Interactive Support Card */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-400">
                <h3 className="font-semibold text-lg mb-4 text-red-700">Need to Talk Right Now?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <img 
                        src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Breathe exercise icon&id=breathe-icon-emergency" 
                        alt="Breathing exercise icon for calmness" 
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-sm font-medium">Deep Breathing</span>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <img 
                        src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Grounding technique icon&id=grounding-icon-emergency" 
                        alt="Grounding technique icon for immediate relief" 
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-sm font-medium">Grounding Exercise</span>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <img 
                        src="https://placeholder-image-service.onrender.com/image/24x24?prompt=Self care quick tips icon&id=selfcare-icon-emergency" 
                        alt="Self care quick tips icon" 
                        className="w-6 h-6"
                      />
                    </div>
                    <span className="text-sm font-medium">Quick Self-Care</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>
              
              <h3 className="font-semibold text-lg mb-3 text-primary relative z-10">Remember, seeking help is a sign of strength</h3>
              <p className="text-muted-foreground relative z-10">
                You don't have to face challenges alone. Reach out when you need support.
              </p>
              
              {/* Floating feedback button */}
              <button 
                onClick={() => setShowFeedback(true)}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors relative z-10"
              >
                Share Feedback
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Add additional CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes message-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-message-in {
          animation: message-in 0.4s ease-out;
        }
      `}</style>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes growHeight {
          from { height: 0%; }
          to { height: var(--target-height); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
      
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-center mb-4">Share Your Feedback</h3>
            <textarea 
              placeholder="How can we improve your experience?"
              className="w-full border rounded-lg p-4 mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowFeedback(false)}
                className="flex-1 bg-secondary text-foreground py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowFeedback(false);
                  // Handle feedback submission
                }}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-secondary text-center py-6 mt-12">
        <p className="text-muted-foreground">
          Mind Bloom &copy; {new Date().getFullYear()} | Your privacy and confidentiality are our priority
        </p>
      </footer>
    </div>
  );
};

export default MentalWellnessApp;
