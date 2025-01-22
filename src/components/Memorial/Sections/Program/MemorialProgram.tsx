
interface ProgramMemorialProps {
  time: string;
  title: string;
  description: string;
}

const ProgramItem: React.FC<ProgramMemorialProps> = ({ time, title, description }) => (
  <div className="flex gap-6 border-b border-[#FBEAE0] pb-4 last:border-b-0">
    <div className="text-right text-lg font-semibold text-primary min-w-[70px]">{time}</div>
    <div>
      <h3 className="text-lg font-medium text-primary">{title}</h3>
      {description && (
        <p className="text-sm text-gray-700 mt-1">
          {description}
        </p>
      )}
    </div>
  </div>
);

const MemorialProgram: React.FC = () => {
  const programData = [
    { time: '5:30 AM', title: 'Departure Kiamumbi', description: '' },
    { time: '6:30 AM', title: 'Viewing of the Body', description: 'At Chiromo Funeral Parlour' },
    { time: '6:50 AM', title: 'Prayers', description: 'Brief service before departure' },
    { time: '7:00 AM', title: 'Departure Chiromo', description: 'Journey to Laikipia' },
    { time: '10:30 AM', title: 'Arrival Laikipia University', description: 'Short break and refreshments' },
    { time: '11:00 AM', title: 'Arrival at Home', description: 'Final journey home' },
    { time: '11:15 AM', title: 'Welcome and Opening Prayers', description: 'Led by Reverend Mwangi' },
    {
      time: '11:30 AM',
      title: 'Photo Session',
      description: 'Family groups: Parents, Children, Brothers, Sisters, Grandparents, Relatives, Friends',
    },
    {
      time: '12:00 PM',
      title: 'Speeches',
      description: "Local Administration, Family Representatives (Dad's and Mum's), Friends and Neighbors",
    },
    {
      time: '1:00 PM',
      title: 'Lunch',
      description: 'Buffet lunch for all guests',
    },
    {
      time: '2:00 PM',
      title: 'Eulogies',
      description: 'Reading of tributes from family, friends, and colleagues',
    },
    {
      time: '3:30 PM',
      title: 'Thanksgiving Service',
      description: 'Conducted by Pastor Wanjiru',
    },
    {
      time: '4:00 PM',
      title: 'Final Resting Ceremony',
      description: 'Laying the body to rest at the family home',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-primary-hover_light rounded-lg shadow-lg p-8 mt-10">
      <h1 className="text-4xl font-bold text-center text-[#774936]">
        Memorial Program
      </h1>
      <h2 className="text-lg text-gray-700 text-center mt-2">
        Wednesday, 15th August 2018
      </h2>
      <div className="mt-8 space-y-6">
        {programData.map((item, index) => (
          <ProgramItem
            key={index}
            time={item.time}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MemorialProgram;
