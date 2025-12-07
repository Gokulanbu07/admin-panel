// src/pages/HomePage.jsx
import React from 'react';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleViewDetails = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    // --- DARK LUXURY THEME COLORS ---
    const BACKGROUND_DARK_COLOR = '#050508';   // Overall page background
    const PRIMARY_TEXT_COLOR = '#F5F5F5';      // Light text
    const ACCENT_GOLD = '#D4AF37';             // Gold accent
    const CARD_DARK = '#111118';               // Dark card / panel background;

    // 👉 Change this to your local hero image in assets, e.g. '/assets/hero-home.jpg'
    const HERO_IMAGE_URL = '/assets/Home.jpg';

    // --- Placeholder Data for Property Cards (unchanged for now) ---
    const properties = [
        { id: 1, title: 'Modern Downtown Apartment', price: '500,000', location: 'New York', imageUrl: 'https://placehold.co/400x300/111118/F5F5F5?text=Apartment' },
        { id: 2, title: 'Suburban Family House', price: '850,000', location: 'Texas', imageUrl: 'https://placehold.co/400x300/111118/F5F5F5?text=House' },
        { id: 3, title: 'Luxury Beachfront Villa', price: '1,200,000', location: 'Miami', imageUrl: 'https://placehold.co/400x300/111118/F5F5F5?text=Villa' },
    ];

        const categories = [
        {
            key: 'rent',
            label: 'Rent',
            description: 'Curated rental homes with transparent pricing.',
            badge: 'Popular',
            icon: '🏠',
        },
        {
            key: 'pg',
            label: 'PG',
            description: 'Comfortable PG options for students & working professionals.',
            badge: 'Budget Friendly',
            icon: '🛏️',
        },
        {
            key: 'family',
            label: 'Family',
            description: 'Spacious homes in family-friendly localities.',
            badge: 'Safe Localities',
            icon: '👨‍👩‍👧‍👦',
        },
        {
            key: 'bachelor',
            label: 'Bachelors',
            description: 'Flexible bachelor accommodations with essential amenities.',
            badge: 'Flexible Stay',
            icon: '🧑‍💻',
        },
        {
            key: 'rooms',
            label: 'Rooms',
            description: 'Single & shared rooms with all basics covered.',
            badge: 'Easy Move-in',
            icon: '🚪',
        },
    ];

        const whyPoints = [
        {
            key: 'verified',
            title: 'Verified Listings',
            description: 'Every property is verified by our team to ensure accurate details, real photos, and genuine owners.',
            icon: '✔️',
        },
        {
            key: 'support',
            title: 'Dedicated Support',
            description: 'Get assistance at every step — from shortlisting to finalizing the agreement and moving in.',
            icon: '🤝',
        },
        {
            key: 'transparent',
            title: 'Transparent Pricing',
            description: 'No hidden charges. View clear rent, deposit, and maintenance details before you decide.',
            icon: '💰',
        },
        {
            key: 'comfort',
            title: 'Comfort & Convenience',
            description: 'Find homes and rooms near your workplace or college, with the amenities you truly need.',
            icon: '✨',
        },
    ];



    return (
        <>
            <style jsx="true">{`
                .homepage-main {
                    background-color: ${BACKGROUND_DARK_COLOR};
                    padding-bottom: 4rem;
                    color: ${PRIMARY_TEXT_COLOR};
                }

                /* ================= HERO SECTION ================= */
                .hero-section {
                    position: relative;
                    min-height: 80vh;
                    background: 
                        linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(8, 8, 10, 0.9)),
                        url('${HERO_IMAGE_URL}') no-repeat center center;
                    background-size: cover;
                    display: flex;
                    align-items: center;
                    padding: 7rem 0 5rem 0;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.25), transparent 55%);
                    pointer-events: none;
                }

                .hero-content {
                    position: relative;
                    max-width: 720px;
                    z-index: 1;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.35rem 0.9rem;
                    border-radius: 999px;
                    border: 1px solid rgba(212, 175, 55, 0.6);
                    background: rgba(5, 5, 8, 0.8);
                    font-size: 0.85rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: ${ACCENT_GOLD};
                    margin-bottom: 1rem;
                }

                .hero-title {
                    font-size: 3.2rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                    color: ${PRIMARY_TEXT_COLOR};
                }

                .hero-highlight {
                    color: ${ACCENT_GOLD};
                }

                .hero-subtitle {
                    font-size: 1.05rem;
                    color: #d0d0d0;
                    max-width: 560px;
                    margin-bottom: 2rem;
                    font-weight: 300;
                }

                .hero-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .btn-gold-primary {
                    background-color: ${ACCENT_GOLD};
                    border-color: ${ACCENT_GOLD};
                    color: #050508;
                    font-weight: 600;
                    padding: 0.75rem 2.2rem;
                    border-radius: 999px;
                    font-size: 1rem;
                }

                .btn-gold-primary:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    color: #050508;
                }

                .btn-outline-light-rounded {
                    background: transparent;
                    border-radius: 999px;
                    padding: 0.75rem 2.2rem;
                    border: 1px solid rgba(245, 245, 245, 0.7);
                    color: #f5f5f5;
                    font-weight: 500;
                    font-size: 0.98rem;
                }

                .btn-outline-light-rounded:hover {
                    background: rgba(245, 245, 245, 0.08);
                    border-color: #f5f5f5;
                    color: #ffffff;
                }

                                /* ================= CATEGORY SECTION ================= */
                .category-section {
                    padding: 4rem 0 2rem 0;
                }

                .category-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .category-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .category-subtitle {
                    font-size: 0.98rem;
                    color: #b4b4b4;
                    max-width: 520px;
                    margin: 0 auto;
                }

                .category-card {
                    background: #0b0b10;
                    border-radius: 18px;
                    padding: 1.5rem 1.3rem;
                    border: 1px solid #20202a;
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .category-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
                    border-color: rgba(212, 175, 55, 0.7);
                    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), #050508);
                }

                .category-icon-wrap {
                    width: 44px;
                    height: 44px;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent 60%);
                }

                .category-label-row {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    gap: 0.5rem;
                }

                .category-label {
                    font-size: 1.05rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                }

                .category-badge {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 0.2rem 0.6rem;
                    border-radius: 999px;
                    border: 1px solid rgba(212, 175, 55, 0.7);
                    color: ${ACCENT_GOLD};
                }

                .category-description {
                    font-size: 0.9rem;
                    color: #c2c2c2;
                }

                .category-link {
                    margin-top: auto;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: ${ACCENT_GOLD};
                    cursor: pointer;
                }

                .category-link span {
                    font-size: 1.1rem;
                    transform: translateY(1px);
                }
                

                                /* ================= WHY CHOOSE US SECTION ================= */
                .why-section {
                    padding: 4rem 0;
                }

                .why-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .why-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .why-subtitle {
                    font-size: 0.98rem;
                    color: #b4b4b4;
                    max-width: 520px;
                    margin: 0 auto;
                }

                .why-card {
                    background: #0b0b10;
                    border-radius: 18px;
                    padding: 1.6rem 1.4rem;
                    border: 1px solid #20202a;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.7rem;
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
                }

                .why-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
                    border-color: rgba(212, 175, 55, 0.7);
                    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), #050508);
                }

                .why-icon-wrap {
                    width: 46px;
                    height: 46px;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent 60%);
                }

                .why-card-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: ${ACCENT_GOLD};
                }

                .why-card-text {
                    font-size: 0.9rem;
                    color: #c2c2c2;
                }

                .why-card-tag {
                    margin-top: auto;
                    font-size: 0.78rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #8f8f9c;
                }



                /* ================= SEARCH BAR CARD ================= */
                .search-bar-wrapper {
                    position: relative;
                    margin-top: -3rem;
                    z-index: 10;
                }

                .search-bar-container {
                    background: ${CARD_DARK};
                    padding: 1.5rem 2rem;
                    border-radius: 18px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    backdrop-filter: blur(6px);
                }

                .search-label {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #b4b4b4;
                    margin-bottom: 0.3rem;
                }

                .search-input,
                .search-select {
                    background-color: #050508;
                    border-radius: 999px;
                    border: 1px solid #2a2a35;
                    color: ${PRIMARY_TEXT_COLOR};
                    font-size: 0.9rem;
                    padding: 0.6rem 1rem;
                }

                .search-input::placeholder {
                    color: #8f8f9c;
                }

                .search-input:focus,
                .search-select:focus {
                    outline: none;
                    box-shadow: 0 0 0 1px ${ACCENT_GOLD};
                    border-color: ${ACCENT_GOLD};
                }

                .btn-search-gold {
                    width: 100%;
                    border-radius: 999px;
                    background-color: ${ACCENT_GOLD};
                    border-color: ${ACCENT_GOLD};
                    color: #050508;
                    font-weight: 600;
                    padding: 0.8rem 1rem;
                    margin-top: 1.4rem;
                }

                .btn-search-gold:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                }

                

                /* ================= FEATURED SECTION (still basic for now) ================= */
                .property-card {
                    background-color: #0b0b10;
                    border: 1px solid #20202a;
                    color: ${PRIMARY_TEXT_COLOR};
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                    border-radius: 16px;
                    overflow: hidden;
                }

                .property-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
                    border-color: rgba(212, 175, 55, 0.6);
                }

                .property-card img {
                    height: 220px;
                    object-fit: cover;
                }

                .card-title {
                    color: ${ACCENT_GOLD};
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.3rem;
                    }
                    .hero-section {
                        min-height: 70vh;
                        padding-top: 6rem;
                    }
                    .search-bar-wrapper {
                        margin-top: -2rem;
                    }
                }
                                /* ========== FINAL POLISH & RESPONSIVE TWEAKS ========== */

                /* Smooth section anchor offset (for scrollIntoView etc.) */
                .homepage-main section {
                    scroll-margin-top: 90px;
                }

                /* Better spacing after search + categories + why */
                .category-section,
                .why-section {
                    padding-top: 3.5rem;
                    padding-bottom: 3.5rem;
                }

                /* Featured section spacing */
                #featured-section {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                }

                /* Mobile tweaks */
                @media (max-width: 768px) {
                    .hero-actions {
                        justify-content: flex-start;
                    }
                }

                @media (max-width: 576px) {
                    .hero-actions {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .hero-actions > * {
                        width: 100%;
                        text-align: center;
                    }

                    .search-bar-container {
                        padding: 1.2rem 1.2rem;
                    }
                }




            `}</style>

            <div className="homepage-main">
                {/* ================= HERO SECTION ================= */}
                <section className="hero-section">
                    <div className="hero-overlay" />
                    <Container>
                        <div className="hero-content">
                            <div className="hero-badge">
                                PREMIUM RENTALS
                                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: ACCENT_GOLD }} />
                                CURATED FOR YOU
                            </div>

                            <h1 className="hero-title">
                                Find your <span className="hero-highlight">next perfect stay</span> in the city.
                            </h1>

                            <p className="hero-subtitle">
                                Discover handpicked homes, PGs, and apartments for families and bachelors.
                                Verified listings, transparent pricing, and a smooth renting experience — all in one place.
                            </p>

                            <div className="hero-actions">
                                <Button
                                    className="btn-gold-primary"
                                    onClick={() => navigate('/properties')}
                                >
                                    Explore Listings
                                </Button>

                                <Button
                                    className="btn-outline-light-rounded"
                                    onClick={() => {
                                        const el = document.getElementById('featured-section');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    View Featured Homes
                                </Button>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* ================= SEARCH BAR (FLOATING BELOW HERO) ================= */}
                <section className="search-bar-wrapper">
                    <Container>
                        <div className="search-bar-container">
                            <Form>
                                <Row className="g-3 align-items-end">
                                    <Col xs={12} md={4}>
                                        <div>
                                            <div className="search-label">Location</div>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter city or area"
                                                className="search-input"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <div>
                                            <div className="search-label">Category</div>
                                            <Form.Select className="search-select">
                                                <option value="">Select category</option>
                                                <option value="rent">Rent</option>
                                                <option value="pg">PG</option>
                                                <option value="family">Family</option>
                                                <option value="bachelor">Bachelors</option>
                                                <option value="rooms">Rooms</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <div>
                                            <div className="search-label">Budget (₹)</div>
                                            <Form.Control
                                                type="number"
                                                placeholder="Max budget"
                                                className="search-input"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={1}>
                                        <Button className="btn-search-gold">
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Container>
                </section>


                                {/* ================= CATEGORY SECTION ================= */}
                <section className="category-section">
                    <Container>
                        <div className="category-header">
                            <h2 className="category-title">
                                Browse by <span style={{ color: ACCENT_GOLD }}>Category</span>
                            </h2>
                            <p className="category-subtitle">
                                Find the perfect match for your lifestyle – from cozy PGs to premium family homes and flexible bachelor stays.
                            </p>
                        </div>

                        <Row className="g-4">
                            {categories.map((cat) => (
                                <Col key={cat.key} xs={12} sm={6} lg={4}>
                                    <div className="category-card">
                                        <div className="category-icon-wrap">
                                            <span role="img" aria-label={cat.label}>
                                                {cat.icon}
                                            </span>
                                        </div>

                                        <div className="category-label-row">
                                            <div className="category-label">
                                                {cat.label}
                                            </div>
                                            <div className="category-badge">
                                                {cat.badge}
                                            </div>
                                        </div>

                                        <div className="category-description">
                                            {cat.description}
                                        </div>

                                        <div
                                            className="category-link"
                                            onClick={() => {
                                                // 👉 later you can navigate with filters if you want
                                                navigate('/properties'); 
                                            }}
                                        >
                                            Explore {cat.label}
                                            <span>→</span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>


                                {/* ================= WHY CHOOSE US SECTION ================= */}
                <section className="why-section">
                    <Container>
                        <div className="why-header">
                            <h2 className="why-title">
                                Why <span style={{ color: ACCENT_GOLD }}>Choose Us</span>?
                            </h2>
                            <p className="why-subtitle">
                                We focus on trust, comfort, and transparency — so you can find a home that feels right,
                                without any unpleasant surprises.
                            </p>
                        </div>

                        <Row className="g-4">
                            {whyPoints.map((point) => (
                                <Col key={point.key} xs={12} sm={6} lg={3}>
                                    <div className="why-card">
                                        <div className="why-icon-wrap">
                                            <span role="img" aria-label={point.title}>
                                                {point.icon}
                                            </span>
                                        </div>
                                        <div className="why-card-title">
                                            {point.title}
                                        </div>
                                        <div className="why-card-text">
                                            {point.description}
                                        </div>
                                        <div className="why-card-tag">
                                            trusted by renters
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>



                {/* ================= FEATURED LISTINGS (we'll beautify next) ================= */}
                <Container id="featured-section" className="mt-5">
                    <h2 className="text-center mb-4" style={{ color: PRIMARY_TEXT_COLOR }}>
                        Featured Listings
                    </h2>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {properties.map((property) => (
                            <Col key={property.id}>
                                <Card className="property-card h-100">
                                    <Card.Img variant="top" src={property.imageUrl} alt={property.title} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="card-title">{property.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Price:</strong> {property.price}<br />
                                            <strong>Location:</strong> {property.location}
                                        </Card.Text>
                                        <Button
                                            className="mt-auto btn-gold-primary"
                                            onClick={() => handleViewDetails(property.id)}
                                        >
                                            View Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default HomePage;
