'use client';

export const BenefitsSection = () => {
    const benefits = [
        'Персональное меню',
        'Проверенные рецепты',
        'Умный список покупок',
        'Минималистичный интерфейс'
    ];

    return (
        <section className="bg-[#e4d1c1] py-20 px-6 md:px-20 w-full">
            <div className=' max-w-7xl mx-auto'>

            <h2 className="text-3xl font-semibold text-center mb-12">Почему Dr Diet — это удобно?</h2>
            <div className="grid md:grid-cols-4 gap-6">
                {benefits.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center">
                        <p className="font-medium">{item}</p>
                    </div>
                ))}
            </div>
            </div>
        </section>
    );
}
