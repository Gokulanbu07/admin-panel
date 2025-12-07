import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BACKGROUND_DARK_COLOR = '#050508';
const ACCENT_COLOR = '#D4AF37';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const AboutUs = () => {
    const navigate = useNavigate();

    const handleCtaClick = () => {
        navigate('/contact');
    };

    return (
        <div
            className="about-us-page"
            style={{ backgroundColor: BACKGROUND_DARK_COLOR, minHeight: '100vh' }}
        >
            <style jsx="true">{`
                .about-hero {
                    padding: 6rem 0 4rem;
                    background: radial-gradient(
                            circle at top left,
                            rgba(212, 175, 55, 0.18),
                            transparent 55%
                        ),
                        #050508;
                    color: ${TEXT_LIGHT};
                    text-align: center;
                }
                .about-eyebrow {
                    font-size: 0.8rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #b4b4b4;
                    margin-bottom: 0.5rem;
                }
                .about-hero-title {
                    font-size: 2.4rem;
                    font-weight: 800;
                    margin-bottom: 0.6rem;
                }
                .about-hero-title span {
                    color: ${ACCENT_COLOR};
                }
                .about-hero-sub {
                    font-size: 1rem;
                    color: #c2c2c2;
                    max-width: 620px;
                    margin: 0 auto;
                }

                .about-section {
                    padding: 3.5rem 0;
                }

                .about-section-heading {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .about-section-heading h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: ${TEXT_LIGHT};
                }

                .about-section-heading p {
                    color: #b4b4b4;
                    max-width: 520px;
                    margin: 0.6rem auto 0;
                    font-size: 0.95rem;
                }

                .about-card {
                    background: ${CARD_DARK};
                    border-radius: 16px;
                    border: 1px solid #20202a;
                    padding: 1.8rem 1.6rem;
                    color: ${TEXT_LIGHT};
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.75);
                }

                .about-card h4 {
                    color: ${ACCENT_COLOR};
                    font-weight: 700;
                    margin-bottom: 0.6rem;
                    font-size: 1.1rem;
                }

                .about-card p {
                    color: #d0d0d0;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                .about-team-section {
                    padding: 3.5rem 0;
                    background: #050509;
                }

                .about-team-heading h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: ${TEXT_LIGHT};
                }

                .about-team-heading p {
                    color: #c8c8c8;
                    margin-top: 0.5rem;
                    font-size: 0.95rem;
                }

                .team-member-card {
                    padding: 1.6rem 1.4rem;
                    border-radius: 16px;
                    background-color: ${CARD_DARK};
                    border: 1px solid #20202a;
                    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.7);
                    height: 100%;
                    transition: transform 0.25s ease, box-shadow 0.25s ease,
                        border-color 0.25s ease, background 0.25s ease;
                    cursor: default;
                    text-align: center;
                    color: ${TEXT_LIGHT};
                }

                .team-member-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
                    border-color: rgba(212, 175, 55, 0.6);
                    background: radial-gradient(
                        circle at top left,
                        rgba(212, 175, 55, 0.08),
                        #050508
                    );
                }

                .team-member-img {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid rgba(212, 175, 55, 0.45);
                    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.7);
                }

                .team-member-name {
                    margin-top: 0.9rem;
                    font-weight: 600;
                    font-size: 1rem;
                }

                .team-member-role {
                    font-size: 0.9rem;
                    color: #b4b4b4;
                }

                .about-cta-section {
                    padding: 3.5rem 0 4rem;
                    text-align: center;
                    border-top: 1px solid #20202a;
                }

                .about-cta-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: ${TEXT_LIGHT};
                    margin-bottom: 0.6rem;
                }

                .about-cta-sub {
                    font-size: 0.95rem;
                    color: #c2c2c2;
                    max-width: 520px;
                    margin: 0 auto 1.6rem;
                }

                .about-cta-button {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    font-size: 1rem;
                    padding: 0.75rem 2.1rem;
                    border-radius: 999px;
                    font-weight: 600;
                    color: #050508;
                    transition: all 0.25s ease;
                }

                .about-cta-button:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 24px rgba(212, 175, 55, 0.6);
                    color: #050508;
                }

                @media (max-width: 576px) {
                    .about-hero-title {
                        font-size: 2rem;
                    }
                }
            `}</style>

            {/* Hero */}
            <header className="about-hero">
                <Container>
                    <div className="about-eyebrow">ABOUT GOHOME</div>
                    <h1 className="about-hero-title">
                        Building <span>trusted</span> rental experiences.
                    </h1>
                    <p className="about-hero-sub">
                        We combine local expertise with technology to help you discover verified rentals,
                        comfortable stays, and homes that truly fit your life.
                    </p>
                </Container>
            </header>

            {/* Core values / mission & vision */}
            <section className="about-section">
                <Container>
                    <div className="about-section-heading">
                        <h2>Our Core Values</h2>
                        <p>
                            A clear purpose drives us forward and guides every interaction with owners and tenants.
                        </p>
                    </div>
                    <Row className="g-4">
                        <Col md={6}>
                            <div className="about-card h-100">
                                <h4>Our Mission</h4>
                                <p>
                                    To simplify the home rental process for everyone. We focus on transparency,
                                    reliability, and genuine support — so every move feels like a step up, not a
                                    burden.
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="about-card h-100">
                                <h4>Our Vision</h4>
                                <p>
                                    To be the most trusted rental platform, where every listing is verified, every
                                    conversation is clear, and every user feels confident about the place they choose
                                    to call home.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Team */}
            <section className="about-team-section">
                <Container>
                    <Row className="text-center mb-4">
                        <Col lg={{ span: 8, offset: 2 }} className="about-team-heading">
                            <h2>Meet Our Top Agents</h2>
                            <p>
                                A dedicated team working closely with owners and tenants to ensure smooth, honest, and
                                stress-free renting.
                            </p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col lg={4} md={6}>
                            <div className="team-member-card">
                                <img
                                    src="https://placehold.co/120x120/222222/F5F5F5?text=V"
                                    className="team-member-img"
                                    alt="Vasanth"
                                />
                                <div className="team-member-name">Prema</div>
                                <div className="team-member-role">Managing Director, Chennai</div>
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className="team-member-card">
                                <img
                                    src="https://placehold.co/120x120/222222/F5F5F5?text=N"
                                    className="team-member-img"
                                    alt="Nishita"
                                />
                                <div className="team-member-name">Nishita</div>
                                <div className="team-member-role">Senior Consultant, Coimbatore</div>
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className="team-member-card">
                                <img
                                    src="https://placehold.co/120x120/222222/F5F5F5?text=G"
                                    className="team-member-img"
                                    alt="Gokul"
                                />
                                <div className="team-member-name">Gokul</div>
                                <div className="team-member-role">Regional Manager, Bangalore</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA */}
            <section className="about-cta-section">
                <Container>
                    <h2 className="about-cta-title">Ready to start your search?</h2>
                    <p className="about-cta-sub">
                        Tell us what you&apos;re looking for — a family home, bachelor stay, or PG — and we&apos;ll
                        help you find the best options faster.
                    </p>
                    <Button
                        size="lg"
                        onClick={handleCtaClick}
                        className="about-cta-button"
                    >
                        Contact Us <i className="fas fa-chevron-right ms-2"></i>
                    </Button>
                </Container>
            </section>
        </div>
    );
};

export default AboutUs;
