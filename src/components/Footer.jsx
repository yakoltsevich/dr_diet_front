export const Footer = () => {
    return (
        <footer className="bg-textColor text-white py-10 text-center text-sm w-full">
            <p>© {new Date().getFullYear()} Dr Diet App. Все права защищены.</p>
            <div className="mt-2 space-x-4">
                <a href="/" className="hover:underline">Главная</a>
                <a href="/login" className="hover:underline">Вход</a>
                <a href="/register" className="hover:underline">Регистрация</a>
                <a href="/privacy" className="hover:underline">Политика конфиденциальности</a>
                <a href="/terms" className="hover:underline">Условия использования</a>
            </div>
        </footer>
    );
}
