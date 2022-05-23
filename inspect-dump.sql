--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: snippets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snippets (
    id integer,
    summary_id integer,
    value character varying(255)
);


ALTER TABLE public.snippets OWNER TO postgres;

--
-- Name: summaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.summaries (
    id integer,
    url character varying(255),
    title character varying(255)
);


ALTER TABLE public.summaries OWNER TO postgres;

--
-- Data for Name: snippets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snippets (id, summary_id, value) FROM stdin;
1	1	Since the start of 2022, the initial version of Omicron, known as BA.1, has been spinning off new sublineages — BA.2, BA.2.12.1, BA.4, BA.5 — at an alarming pace.
2	1	They all have one worrisome trait in common: They’re getting better and better at sidestepping immunity and sickening people who were previously shielded by vaccination or prior infection.
3	1	The virus, in other words, is now evolving faster — and in a more consequential way — than ever before.
4	1	All three strains share several mutations with BA.2, but they also boast additional alterations in a key amino acid called L452, which may help explain why all three dodge immunity so well.
5	1	Yet initial studies indicate that there’s little cross-immunity between BA.1 and BA.2.12.1, BA.4 or BA.5
\.


--
-- Data for Name: summaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.summaries (id, url, title) FROM stdin;
1	https://news.yahoo.com/future-covid-variants-will-likely-reinfect-us-multiple-times-a-year-experts-say-unless-we-invest-in-new-vaccines-121959797.html	Omicron variants of COVID-19 is the source of it being endemic
\.


--
-- PostgreSQL database dump complete
--

