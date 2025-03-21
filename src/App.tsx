import React, { useState, useEffect } from 'react';
import { Moon, Book, Clock, Calendar, Bell, CheckCircle, MessageCircle, Send } from 'lucide-react';
import { format } from 'date-fns';

type DuaaType = {
  arabic: string;
  translation: string;
  transliteration: string;
};

type PrayerTimes = {
  [key: string]: string;
};

type Message = {
  text: string;
  isUser: boolean;
};

function App() {
  const [activeTab, setActiveTab] = useState<'duaas' | 'reminders' | 'activities' | 'chat'>('duaas');
  const [nightNumber, setNightNumber] = useState(21);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Assalamu alaikum! I'm here to help answer your questions about Islam. What would you like to know?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const commonQuestions = {
    "what are the five pillars of islam": "The Five Pillars of Islam are: 1) Shahada (Declaration of Faith), 2) Salah (Prayer), 3) Zakat (Charity), 4) Sawm (Fasting during Ramadan), and 5) Hajj (Pilgrimage to Mecca).",
    "how do i perform wudu": "Wudu (ablution) steps: 1) Make intention 2) Wash hands 3) Rinse mouth and nose 4) Wash face 5) Wash arms to elbows 6) Wipe head 7) Wipe ears 8) Wash feet to ankles. Perform in order and ensure each part is washed three times.",
    "what is ramadan": "Ramadan is the ninth month of the Islamic calendar when Muslims fast from dawn to sunset. It's a time of spiritual reflection, increased charity and worship, and reading of the Quran.",
    "how many rakats in each prayer": "Fajr: 2 rakats\nDhuhr: 4 rakats\nAsr: 4 rakats\nMaghrib: 3 rakats\nIsha: 4 rakats",
    "what breaks the fast": "Things that break the fast include: eating, drinking, intimate relations, intentional vomiting, and the beginning of menstruation. Unintentional acts do not break the fast.",
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isUser: true };
    const question = inputMessage.toLowerCase();
    
    setMessages(prev => [...prev, userMessage]);

    const answer = commonQuestions[question] || 
      "I apologize, but I don't have specific information about that. Please consult with a knowledgeable Islamic scholar or refer to reliable Islamic sources for accurate guidance.";

    setTimeout(() => {
      setMessages(prev => [...prev, { text: answer, isUser: false }]);
    }, 500);

    setInputMessage('');
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${format(today, 'dd-MM-yyyy')}?city=Kuala%20Lumpur&country=Malaysia&method=3`
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, []);

  const duaas: DuaaType[] = [
    {
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      translation: "O Allah, You are Most Forgiving, and You love forgiveness; so forgive me",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni"
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      translation: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the torment of the Fire",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar"
    },
    {
      arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
      translation: "My Lord, forgive me and my parents and the believers on the Day when the account will be established",
      transliteration: "Rabbigh-fir lee wa li-walidayya wa lil-mu'mineena yawma yaqoomul hisaab"
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      translation: "O Allah, I ask You for guidance, piety, chastity and contentment",
      transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina"
    },
    {
      arabic: "رَبِّ زِدْنِي عِلْماً",
      translation: "My Lord, increase me in knowledge",
      transliteration: "Rabbi zidni 'ilma"
    }
  ];

  const reminders = [
    "Pray Tahajjud in the last third of the night",
    "Recite Quran with understanding",
    "Give charity",
    "Make abundant dua",
    "Perform I'tikaf if possible"
  ];

  const activities = [
    "Complete Quran recitation",
    "Extra prayers (Nafl)",
    "Dhikr sessions",
    "Help prepare Iftar",
    "Share Islamic knowledge"
  ];

  const prayerNames = {
    Fajr: "Fajr",
    Dhuhr: "Dhuhr",
    Asr: "Asr",
    Maghrib: "Maghrib",
    Isha: "Isha"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white relative overflow-hidden">
      <div className="ramadan-pattern opacity-20"></div>
      
      {/* Decorative Elements */}
      <div className="crescent absolute top-4 left-4 opacity-40"></div>
      <div className="crescent crescent-small absolute top-20 right-8 opacity-30"></div>
      <div className="stars absolute top-12 left-20"></div>
      <div className="stars absolute top-16 right-32"></div>
      
      {/* Header */}
      <header className="pt-8 pb-6 text-center relative">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Moon className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Ramadan Assistant</h1>
        </div>
        <h2 className="text-4xl mb-4 arabic-title text-amber-300">رمضان كريم</h2>
        <p className="text-xl">Last 10 Nights - Night {nightNumber}</p>
        
        {/* Prayer Times */}
        <div className="mt-6 bg-purple-800 bg-opacity-50 p-4 rounded-lg max-w-md mx-auto backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-3">Kuala Lumpur Prayer Times</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {prayerTimes && Object.entries(prayerNames).map(([key, name]) => (
              <div key={key} className="bg-purple-700 bg-opacity-50 p-2 rounded backdrop-blur-sm">
                <div className="font-semibold">{name}</div>
                <div>{prayerTimes[key]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {[21, 23, 25, 27, 29].map((night) => (
            <button
              key={night}
              onClick={() => setNightNumber(night)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                nightNumber === night
                  ? 'bg-white text-purple-900 shadow-lg shadow-amber-200/20'
                  : 'bg-purple-800 hover:bg-purple-700'
              }`}
            >
              Night {night}
            </button>
          ))}
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-2xl mx-auto mb-8 relative z-10">
        <div className="flex justify-center gap-4 p-2 bg-purple-800 bg-opacity-70 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('duaas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'duaas' ? 'bg-white text-purple-900' : 'hover:bg-purple-700'
            }`}
          >
            <Book className="w-5 h-5" /> Duaas
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'reminders' ? 'bg-white text-purple-900' : 'hover:bg-purple-700'
            }`}
          >
            <Bell className="w-5 h-5" /> Reminders
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'activities' ? 'bg-white text-purple-900' : 'hover:bg-purple-700'
            }`}
          >
            <CheckCircle className="w-5 h-5" /> Activities
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'chat' ? 'bg-white text-purple-900' : 'hover:bg-purple-700'
            }`}
          >
            <MessageCircle className="w-5 h-5" /> Ask Questions
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12 relative z-10">
        {activeTab === 'duaas' && (
          <div className="space-y-6">
            {duaas.map((dua, index) => (
              <div key={index} className="bg-purple-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-amber-200/10 hover:border-amber-200/20 transition-colors">
                <p className="text-2xl mb-4 text-right font-arabic">{dua.arabic}</p>
                <p className="text-lg mb-2 italic">{dua.transliteration}</p>
                <p className="text-gray-200">{dua.translation}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-amber-200/10">
            <ul className="space-y-4">
              {reminders.map((reminder, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-300" />
                  <span>{reminder}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-amber-200/10">
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-300" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-amber-200/10">
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-purple-700 bg-opacity-50 backdrop-blur-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question about Islam..."
                className="flex-1 px-4 py-2 rounded-lg bg-purple-700 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-300 backdrop-blur-sm"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-white text-purple-900 hover:bg-amber-100 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-sm text-amber-200">
              <p>Try asking about:</p>
              <ul className="list-disc list-inside mt-1">
                <li>The Five Pillars of Islam</li>
                <li>How to perform Wudu</li>
                <li>What is Ramadan</li>
                <li>Prayer times and rakats</li>
                <li>What breaks the fast</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;