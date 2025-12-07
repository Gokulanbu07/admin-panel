// src/pages/BrowsePage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Badge,
    Pagination,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BACKGROUND_DARK_COLOR = '#050508';
const ACCENT_COLOR = '#D4AF37';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

// Dummy public properties (frontend-only)
const ALL_PROPERTIES = [
    {
        id: 1,
        title: 'Premium 2BHK for Family',
        city: 'Chennai - Velachery',
        category: 'Family',
        type: 'Rent',
        price: 22000,
        beds: 2,
        baths: 2,
        tag: 'Near IT Park',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=2BHK+Family',
    },
    {
        id: 2,
        title: 'Fully Furnished PG for Gents',
        city: 'Chennai - Tambaram',
        category: 'PG',
        type: 'PG',
        price: 9500,
        beds: 1,
        baths: 1,
        tag: 'Food Included',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=PG+Gents',
    },
    {
        id: 3,
        title: 'Single Room for Bachelors',
        city: 'Chennai - Guindy',
        category: 'Bachelors',
        type: 'Rent',
        price: 8000,
        beds: 1,
        baths: 1,
        tag: 'Walkable to Metro',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=Bachelor+Room',
    },
    {
        id: 4,
        title: 'Shared Room for Students',
        city: 'Chennai - Thoraipakkam',
        category: 'PG',
        type: 'PG',
        price: 7000,
        beds: 1,
        baths: 1,
        tag: 'High-Speed WiFi',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=Shared+PG',
    },
    {
        id: 5,
        title: 'Compact 1RK for Working Men',
        city: 'Chennai - Adyar',
        category: 'Bachelors',
        type: 'Rooms',
        price: 6000,
        beds: 1,
        baths: 1,
        tag: 'Budget Friendly',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=1RK',
    },
    {
        id: 6,
        title: '3BHK Spacious Flat',
        city: 'Chennai - Anna Nagar',
        category: 'Family',
        type: 'Rent',
        price: 35000,
        beds: 3,
        baths: 3,
        tag: 'Car Parking',
        image: 'https://placehold.co/600x400/151515/F5F5F5?text=3BHK+Family',
    },
];

const CATEGORY_TABS = ['All', 'Rent', 'PG', 'Family', 'Bachelors', 'Rooms'];

const BrowsePage = () => {
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('none'); // 'low-high', 'high-low'

    // --- Pagination state ---
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // properties per page

    // reset to page 1 whenever filters/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchText, sortOrder]);

    const filteredProperties = useMemo(() => {
        let list = [...ALL_PROPERTIES];

        // Filter by category / type
        if (activeCategory !== 'All') {
            list = list.filter((p) => {
                if (activeCategory === 'Rent') return p.type === 'Rent';
                if (activeCategory === 'Rooms') return p.type === 'Rooms';
                return p.category === activeCategory;
            });
        }

        // Filter by search text (title + city)
        if (searchText.trim() !== '') {
            const q = searchText.toLowerCase();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.city.toLowerCase().includes(q)
            );
        }

        // Sort by price
        if (sortOrder === 'low-high') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-low') {
            list.sort((a, b) => b.price - a.price);
        }

        return list;
    }, [activeCategory, searchText, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize));

    // clamp current page if filters reduced list
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const paginatedProperties = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredProperties.slice(start, start + pageSize);
    }, [filteredProperties, currentPage]);

    const handleViewDetails = (id) => {
        navigate(`/properties/${id}`);
    };

    return (
        <div
            className="browse-page"
            style={{ backgroundColor: BACKGROUND_DARK_COLOR, minHeight: '100vh' }}
        >
            <style jsx="true">{`
                .browse-wrapper {
                    padding: 3.5rem 0 4rem;
                    background: radial-gradient(
                            circle at top left,
                            rgba(212, 175, 55, 0.16),
                            #050508
                        );
                    color: ${TEXT_LIGHT};
                }

                .browse-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.4rem;
                }

                .browse-sub {
                    font-size: 0.95rem;
                    color: #c2c2c2;
                    max-width: 560px;
                }

                .browse-filter-card {
                    background: ${CARD_DARK};
                    border-radius: 18px;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
                    padding: 1.4rem 1.6rem;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }

                .browse-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .browse-tab-btn {
                    padding: 0.45rem 0.95rem;
                    border-radius: 999px;
                    border: 1px solid #2a2a35;
                    background: #050508;
                    color: #e0e0e0;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .browse-tab-btn.active {
                    background: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    color: #050508;
                    font-weight: 600;
                }

                .browse-tab-btn:hover {
                    border-color: rgba(212, 175, 55, 0.6);
                }

                .browse-search-input {
                    background: #0f1017;
                    border: 1px solid #2a2a35;
                    border-radius: 10px;
                    padding: 0.6rem 0.85rem;
                    color: ${TEXT_LIGHT};
                    font-size: 0.9rem;
                }

                .browse-search-input::placeholder {
                    color: #8f8f9c;
                }

                .browse-search-input:focus {
                    outline: none;
                    border-color: ${ACCENT_COLOR};
                    box-shadow: 0 0 0 1px ${ACCENT_COLOR};
                }

                .browse-sort-select {
                    background: #0f1017;
                    border-radius: 10px;
                    border: 1px solid #2a2a35;
                    color: ${TEXT_LIGHT};
                    font-size: 0.9rem;
                }

                .browse-sort-select:focus {
                    outline: none;
                    border-color: ${ACCENT_COLOR};
                    box-shadow: 0 0 0 1px ${ACCENT_COLOR};
                }

                .browse-property-card {
                    background: ${CARD_DARK};
                    border-radius: 16px;
                    border: 1px solid #20202a;
                    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s ease, box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .browse-property-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 22px 50px rgba(0, 0, 0, 1);
                    border-color: rgba(212, 175, 55, 0.5);
                }

                .browse-property-card img {
                    height: 200px;
                    object-fit: cover;
                }

                .browse-card-title {
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: ${TEXT_LIGHT};
                }

                .browse-card-city {
                    font-size: 0.9rem;
                    color: #c2c2c2;
                }

                .browse-price {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: ${ACCENT_COLOR};
                }

                .browse-meta {
                    font-size: 0.85rem;
                    color: #c2c2c2;
                }

                .browse-tag {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #b4b4b4;
                }

                .browse-btn-details {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    color: #050508;
                    border-radius: 999px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .browse-btn-details:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    color: #050508;
                }

                .browse-empty {
                    text-align: center;
                    color: #c2c2c2;
                    padding: 2rem 0;
                }

                .browse-pagination-wrapper {
                    margin-top: 2rem;
                }
                .browse-pagination-wrapper .page-link {
                    background-color: #0f1017;
                    border-color: #2a2a35;
                    color: ${TEXT_LIGHT};
                }
                .browse-pagination-wrapper .page-item.active .page-link {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    color: #050508;
                    font-weight: 600;
                }
                .browse-pagination-wrapper .page-link:hover {
                    border-color: ${ACCENT_COLOR};
                }
            `}</style>

            <div className="browse-wrapper">
                <Container>
                    {/* Header */}
                    <Row>
                        <Col lg={8}>
                            <h1 className="browse-title">Browse Properties</h1>
                            <p className="browse-sub">
                                Explore rentals, PGs, and rooms across the city. Filter by category,
                                search by location or property name, and compare prices easily.
                            </p>
                        </Col>
                    </Row>

                    {/* Filters */}
                    <div className="browse-filter-card">
                        <div className="browse-tabs mb-2">
                            {CATEGORY_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    className={
                                        'browse-tab-btn' +
                                        (activeCategory === tab ? ' active' : '')
                                    }
                                    onClick={() => setActiveCategory(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <Row className="g-3 align-items-center">
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by area, city, or property name..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="browse-search-input"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="browse-sort-select"
                                >
                                    <option value="none">Sort by: Default</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>

                    {/* Properties Grid */}
                    {filteredProperties.length === 0 ? (
                        <div className="browse-empty">
                            No properties found for your filters. Try changing category or search
                            text.
                        </div>
                    ) : (
                        <>
                            <Row className="g-4">
                                {paginatedProperties.map((property) => (
                                    <Col key={property.id} xs={12} md={6} lg={4}>
                                        <Card className="browse-property-card">
                                            <div style={{ position: 'relative' }}>
                                                <Card.Img
                                                    src={property.image}
                                                    alt={property.title}
                                                />
                                                <Badge
                                                    bg="dark"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        left: '10px',
                                                        backgroundColor:
                                                            'rgba(0,0,0,0.7)',
                                                        borderRadius: '999px',
                                                        padding: '0.25rem 0.7rem',
                                                        fontSize: '0.7rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.12em',
                                                    }}
                                                >
                                                    {property.category}
                                                </Badge>
                                            </div>
                                            <Card.Body className="d-flex flex-column">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <div className="browse-card-title">
                                                            {property.title}
                                                        </div>
                                                        <div className="browse-card-city">
                                                            <i className="fas fa-map-marker-alt me-1"></i>
                                                            {property.city}
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <div className="browse-price">
                                                            ₹
                                                            {property.price.toLocaleString(
                                                                'en-IN'
                                                            )}
                                                        </div>
                                                        <div className="browse-tag">
                                                            {property.type === 'PG'
                                                                ? 'PG / Sharing'
                                                                : property.type}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between browse-meta mb-3">
                                                    <span>
                                                        <i className="fas fa-bed me-1"></i>
                                                        {property.beds} Beds
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-bath me-1"></i>
                                                        {property.baths} Baths
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-star me-1"></i>
                                                        {property.tag}
                                                    </span>
                                                </div>

                                                <Button
                                                    className="mt-auto browse-btn-details"
                                                    onClick={() =>
                                                        handleViewDetails(property.id)
                                                    }
                                                >
                                                    View Details
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="browse-pagination-wrapper">
                                    <Pagination className="justify-content-center mb-0">
                                        <Pagination.Prev
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                setCurrentPage((p) =>
                                                    Math.max(1, p - 1)
                                                )
                                            }
                                        />
                                        {Array.from({ length: totalPages }).map(
                                            (_, index) => (
                                                <Pagination.Item
                                                    key={index + 1}
                                                    active={currentPage === index + 1}
                                                    onClick={() =>
                                                        setCurrentPage(index + 1)
                                                    }
                                                >
                                                    {index + 1}
                                                </Pagination.Item>
                                            )
                                        )}
                                        <Pagination.Next
                                            disabled={currentPage === totalPages}
                                            onClick={() =>
                                                setCurrentPage((p) =>
                                                    Math.min(totalPages, p + 1)
                                                )
                                            }
                                        />
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default BrowsePage;
 