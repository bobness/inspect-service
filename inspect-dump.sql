--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 13.7

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


SET default_tablespace = '';

CREATE SEQUENCE comments_id_seq;
CREATE SEQUENCE followers_id_seq;
CREATE SEQUENCE reactions_id_seq;
CREATE SEQUENCE summaries_id_seq;
CREATE SEQUENCE snippets_id_seq;
CREATE SEQUENCE users_id_seq;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id bigint NOT NULL nextval('comments_id_seq'),
    snippet_id bigint,
    comment text,
    created_at date,
    user_id bigint,
    summary_id bigint
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers (
    id bigint NOT NULL nextval('followers_id_seq'),
    follower_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at date
);


ALTER TABLE public.followers OWNER TO postgres;


--
-- Name: reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reactions (
    id bigint NOT NULL nextval('reactions_id_seq'),
    reaction character varying(255),
    snippet_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at date,
    summary_id bigint NOT NULL
);


ALTER TABLE public.reactions OWNER TO postgres;

--
-- Name: snippets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snippets (
    id integer NOT NULL nextval('snippets_id_seq'),
    summary_id integer,
    value character varying(255)
);


ALTER TABLE public.snippets OWNER TO postgres;

--
-- Name: summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.summaries (
    id integer NOT NULL nextval('summaries_id_seq'),
    url character varying(255),
    title character varying(255),
    user_id bigint,
    avatar_url character varying(255),
    website_logo character varying(255)
);


ALTER TABLE public.summaries OWNER TO postgres;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL nextval('users_id_seq'),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    token character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, snippet_id, comment, created_at, user_id, summary_id) FROM stdin;
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.followers (id, follower_id, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reactions (id, reaction, snippet_id, user_id, created_at, summary_id) FROM stdin;
\.


--
-- Data for Name: snippets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snippets (id, summary_id, value) FROM stdin;
4	1	All three strains share several mutations with BA.2, but they also boast additional alterations in a key amino acid called L452, which may help explain why all three dodge immunity so well.
5	1	Yet initial studies indicate that there's little cross-immunity between BA.1 and BA.2.12.1, BA.4 or BA.5.
1	1	Since the start of 2022, the initial version of Omicron, known as BA.1, has been spinning off new sublineages BA.2, BA.2.12.1, BA.4, BA.5 at an alarming pace.
2	1	They all have one worrisome trait in common: They're getting better and better at sidestepping immunity and sickening people who were previously shielded by vaccination or prior infection.
3	1	The virus, in other words, is now evolving faster and in a more consequential way more than ever before.
\.


--
-- Data for Name: summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.summaries (id, url, title, user_id, avatar_url, website_logo) FROM stdin;
1	https://news.yahoo.com/future-covid-variants-will-likely-reinfect-us-multiple-times-a-year-experts-say-unless-we-invest-in-new-vaccines-121959797.html	Omicron variants of COVID-19 is the source of it being endemic.	1	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, token) FROM stdin;
1	Test	test@test.com	$2a$10$fB1rJiiA/BQI6NOQbZm.yeVRaATwrFLPuR7u6uwgybQRXzc4BFsES	\N
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.followers_id_seq', 1, false);


--
-- Name: reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reactions_id_seq', 1, false);


--
-- Name: snippets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snippets_id_seq', 5, true);


--
-- Name: summaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.summaries_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: reactions reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_pkey PRIMARY KEY (id);


--
-- Name: snippets snippets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snippets
    ADD CONSTRAINT snippets_pkey PRIMARY KEY (id);


--
-- Name: summaries summaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.summaries
    ADD CONSTRAINT summaries_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

