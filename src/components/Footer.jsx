export const Footer = () => {
    return (
        <footer className="bg-textColor text-white py-10 text-center text-sm w-full">
            <p>© {new Date().getFullYear()} Dr Diet App. All rights reserved.</p>
            <div className="mt-2 space-x-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/login" className="hover:underline">Log In</a>
                <a href="/register" className="hover:underline">Sign Up</a>
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Use</a>
            </div>
        </footer>
    );
};
