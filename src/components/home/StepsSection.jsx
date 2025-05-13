'use client';

export const StepsSection = () => {
    const steps = [
        ['Create your profile', 'Set your goals, physical data, and preferences.'],
        ['Get your menu', 'The system will generate daily meals for you.'],
        ['Cook and shop with ease', 'Access recipes and your shopping list.']
    ];

    return (
        <section className="bg-white py-20 px-6 md:px-20 w-full">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-12">How does Dr. Diet work?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map(([title, desc], i) => (
                        <div key={i} className="bg-[#b6c8c4] p-6 rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-bold mb-2">{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
