import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './Clippath.css';

const Clippath = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
            smooth: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        const initialClipPaths = [
            "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
            "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
            "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
            "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
            "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
            "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
            "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
            "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)"
        ];

        const finalClipPaths = [
            "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
            "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
            "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
            "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
            "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
            "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
            "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
            "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
            "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)"
        ];

        function createMasks() {
            const imgs = document.querySelectorAll(".img");
            imgs.forEach((img) => {
                for (let i = 0; i < 9; i++) {
                    const mask = document.createElement("div");
                    mask.classList.add("mask", `m-${i + 1}`);
                    img.appendChild(mask);
                }
            });
        }

        createMasks();

        const rows = document.querySelectorAll(".row");

        rows.forEach((row) => {
            const imgs = row.querySelectorAll(".img");

            imgs.forEach((img) => {
                const masks = img.querySelectorAll(".mask");

                if (masks.length !== initialClipPaths.length) return;

                masks.forEach((mask, index) => {
                    gsap.set(mask, {
                        clipPath: initialClipPaths[index],
                    });
                });

                const t1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%",
                        onUpdate: () => lenis.emit("scroll"),
                    },
                });

                const animationOrder = [
                    [".m-1"],
                    [".m-2", ".m-4"],
                    [".m-3", ".m-5", ".m-7"],
                    [".m-6", ".m-8"],
                    [".m-9"]
                ];

                animationOrder.forEach((targets, index) => {
                    t1.to(
                        targets.map((cls) => img.querySelector(cls)),
                        {
                            clipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
                            duration: 0.5,
                            ease: "power2.out",
                            stagger: 0.1,
                        },
                        index * 0.125,
                    );
                });
            });
        });
    }, []);

    return (
        <>
            {/* <nav>
                <a>Wasteland Couture</a>
                <a>Shop</a>
            </nav> */}

            {/* <section className="hero">
                <h1>Wasteland Couture</h1>
            </section> */}

            {/* <section className="info">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente totam facilis adipisci similique debitis quidem. 
                    Eos harum laboriosam odio aut corrupti possimus vitae saepe iusto. Voluptas ducimus voluptates consectetur dolorem?
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio blanditiis animi aut aspernatur possimus, quas ducimus
                    dicta asperiores facere corrupti, sapiente temporibus maxime magni? Atque voluptas praesentium at nisi facilis!
                </p>
            </section> */}

            <section className="hero-imgs">
                <div className="row">
                    <div className="img img-1"></div>
                    <div className="img img-2"></div>
                </div>
            </section>
{/* 
            <section className="clients">
                <div className="col"><p>Selected clients</p></div>
                <div className="col">
                    <div className="clients-list">
                        <p>Ehiko</p>
                        <p>Kio</p>
                        <p>Jio</p>
                        <p>LOP</p>
                        <p>JIhu</p>
                        <p>mKOp</p>
                        <p>Ldgy</p>
                        <p>Esdch</p>
                    </div>
                    <div className="clients-list">
                        <p>Hiko</p>
                        <p>Losdh</p>
                        <p>Mkshd</p>
                        <p>Hijdo</p>
                        <p>Nods</p>
                        <p>Jvdby</p>
                        <p>Jisd</p>
                        <p>Kind</p>
                    </div>
                </div>
            </section> */}

            <section>
                <div className="row">
                    <div className="img img-3"></div>
                </div>
            </section>

            <section className="product-filters">
                <div className="col">
                    <p>All</p>
                    <p>Light</p>
                    <p>Air</p>
                    <p>Land</p>
                    <p>Water</p>
                </div>
                <div className="col"></div>
            </section>

            <section className="products">
                <div className="row">
                    <div className="img"></div>
                    <div className="img img-4"></div>
                    <div className="img img-5"></div>
                    <div className="img"></div>
                </div>
                <div className="row">
                    <div className="img img-6"></div>
                    <div className="img"></div>
                    <div className="img"></div>
                    <div className="img img-7"></div>
                </div>
                <div className="row">
                    <div className="img"></div>
                    <div className="img img-8"></div>
                    <div className="img"></div>
                    <div className="img img-9"></div>
                </div>
                <div className="row">
                    <div className="img img-10"></div>
                    <div className="img"></div>
                    <div className="img img-11"></div>
                    <div className="img img-12"></div>
                </div>
            </section>

            {/* <section className="about">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum soluta, sit at cupiditate, vero obcaecati eum alias quidem explicabo earum porro natus! Reiciendis debitis est ea ipsum culpa corporis modi?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus debitis architecto illum ut incidunt tempore aspernatur similique, vitae atque amet porro pariatur aperiam, quisquam beatae dignissimos doloremque! Maxime, doloremque ipsum.</p>
            </section> */}

            <section className="about-imgs">
                <div className="row">
                    <div className="img img-13"></div>
                    <div className="img img-14"></div>
                </div>
            </section>

            <section className="outro">
                <div className="row">
                    <div className="img img-15"></div>
                    <div className="img img-16"></div>
                    <div className="img img-17"></div>
                </div>
            </section>
        </>
    );
};

export default Clippath;
