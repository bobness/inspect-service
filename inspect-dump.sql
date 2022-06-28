--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    snippet_id bigint,
    comment text,
    created_at date,
    user_id bigint,
    summary_id bigint
);


ALTER TABLE public.comments OWNER TO inspect;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO inspect;

--
-- Name: comments_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.comments_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq1 OWNER TO inspect;

--
-- Name: comments_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.comments_id_seq1 OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    follower_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at date
);


ALTER TABLE public.followers OWNER TO inspect;

--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.followers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.followers_id_seq OWNER TO inspect;

--
-- Name: followers_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.followers_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.followers_id_seq1 OWNER TO inspect;

--
-- Name: followers_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.followers_id_seq1 OWNED BY public.followers.id;


--
-- Name: reactions; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.reactions (
    id integer NOT NULL,
    reaction character varying(255),
    snippet_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at date,
    summary_id bigint NOT NULL
);


ALTER TABLE public.reactions OWNER TO inspect;

--
-- Name: reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.reactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reactions_id_seq OWNER TO inspect;

--
-- Name: reactions_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.reactions_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reactions_id_seq1 OWNER TO inspect;

--
-- Name: reactions_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.reactions_id_seq1 OWNED BY public.reactions.id;


--
-- Name: snippets; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.snippets (
    id integer NOT NULL,
    summary_id integer,
    value character varying(255)
);


ALTER TABLE public.snippets OWNER TO inspect;

--
-- Name: snippets_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.snippets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snippets_id_seq OWNER TO inspect;

--
-- Name: snippets_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.snippets_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snippets_id_seq1 OWNER TO inspect;

--
-- Name: snippets_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.snippets_id_seq1 OWNED BY public.snippets.id;


--
-- Name: summaries; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.summaries (
    id integer NOT NULL,
    url character varying(255),
    title character varying(255),
    user_id bigint,
    avatar_url character varying(255),
    website_logo character varying(255)
);


ALTER TABLE public.summaries OWNER TO inspect;

--
-- Name: summaries_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.summaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.summaries_id_seq OWNER TO inspect;

--
-- Name: summaries_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.summaries_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.summaries_id_seq1 OWNER TO inspect;

--
-- Name: summaries_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.summaries_id_seq1 OWNED BY public.summaries.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: inspect
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    token character varying(255)
);


ALTER TABLE public.users OWNER TO inspect;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO inspect;

--
-- Name: users_id_seq1; Type: SEQUENCE; Schema: public; Owner: inspect
--

CREATE SEQUENCE public.users_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq1 OWNER TO inspect;

--
-- Name: users_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: inspect
--

ALTER SEQUENCE public.users_id_seq1 OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq1'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq1'::regclass);


--
-- Name: reactions id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.reactions ALTER COLUMN id SET DEFAULT nextval('public.reactions_id_seq1'::regclass);


--
-- Name: snippets id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.snippets ALTER COLUMN id SET DEFAULT nextval('public.snippets_id_seq1'::regclass);


--
-- Name: summaries id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.summaries ALTER COLUMN id SET DEFAULT nextval('public.summaries_id_seq1'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq1'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.comments (id, snippet_id, comment, created_at, user_id, summary_id) FROM stdin;
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.followers (id, follower_id, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.reactions (id, reaction, snippet_id, user_id, created_at, summary_id) FROM stdin;
\.


--
-- Data for Name: snippets; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.snippets (id, summary_id, value) FROM stdin;
4	1	All three strains share several mutations with BA.2, but they also boast additional alterations in a key amino acid called L452, which may help explain why all three dodge immunity so well.
5	1	Yet initial studies indicate that there's little cross-immunity between BA.1 and BA.2.12.1, BA.4 or BA.5.
1	1	Since the start of 2022, the initial version of Omicron, known as BA.1, has been spinning off new sublineages BA.2, BA.2.12.1, BA.4, BA.5 at an alarming pace.
2	1	They all have one worrisome trait in common: They're getting better and better at sidestepping immunity and sickening people who were previously shielded by vaccination or prior infection.
3	1	The virus, in other words, is now evolving faster and in a more consequential way more than ever before.
\.


--
-- Data for Name: summaries; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.summaries (id, url, title, user_id, avatar_url, website_logo) FROM stdin;
1	https://news.yahoo.com/future-covid-variants-will-likely-reinfect-us-multiple-times-a-year-experts-say-unless-we-invest-in-new-vaccines-121959797.html	Omicron variants of COVID-19 is the source of it being endemic.	1	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inspect
--

COPY public.users (id, username, email, password, token) FROM stdin;
1	Test	test@test.com	$2a$10$fB1rJiiA/BQI6NOQbZm.yeVRaATwrFLPuR7u6uwgybQRXzc4BFsES	\N
2	Bob	bob@datagotchi.net	$2y$10$Sk1WeAu.J1Q33clthhaITu3rfy5gbLCpPmUoBfltKAsTsYVgrVfPG	\N
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: comments_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.comments_id_seq1', 1, false);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.followers_id_seq', 1, false);


--
-- Name: followers_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.followers_id_seq1', 1, false);


--
-- Name: reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.reactions_id_seq', 1, false);


--
-- Name: reactions_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.reactions_id_seq1', 1, false);


--
-- Name: snippets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.snippets_id_seq', 5, true);


--
-- Name: snippets_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.snippets_id_seq1', 1, false);


--
-- Name: summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.summaries_id_seq', 1, false);


--
-- Name: summaries_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.summaries_id_seq1', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.users_id_seq', 2, false);


--
-- Name: users_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: inspect
--

SELECT pg_catalog.setval('public.users_id_seq1', 2, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: reactions reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_pkey PRIMARY KEY (id);


--
-- Name: snippets snippets_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.snippets
    ADD CONSTRAINT snippets_pkey PRIMARY KEY (id);


--
-- Name: summaries summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.summaries
    ADD CONSTRAINT summaries_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: inspect
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

