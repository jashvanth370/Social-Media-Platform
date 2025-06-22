export default function Footer() {
    return (

        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <p className="mb-2">© {new Date().getFullYear()} SocialSphere. All rights reserved.</p>
                <div>
                    <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="text-white"><i className="bi bi-envelope"></i></a>
                </div>
            </div>
        </footer>

    )
}