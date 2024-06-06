import React, { useRef, useEffect, MutableRefObject } from 'react';
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import cat from './Cat.jpg';

register();

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'swiper-container': any;
            'swiper-slide': any;
        }
    }
}

const SwiperComponent = () => {
    const swiperElRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const swiperEl = swiperElRef.current;
        if (swiperEl) {
            const handleProgress = (e: any) => {
                const [swiper, progress] = e.detail;
                console.log(progress);
            };

            const handleSlideChange = () => {
                console.log('slide changed');
            };

            swiperEl.addEventListener('progress', handleProgress);
            swiperEl.addEventListener('slidechange', handleSlideChange);

            return () => {
                swiperEl.removeEventListener('progress', handleProgress);
                swiperEl.removeEventListener('slidechange', handleSlideChange);
            };
        }
    }, []);

    return (
        <div className="w-full bg-white">
            <swiper-container
                ref={swiperElRef as MutableRefObject<any>}
                className="swiper-container h-[50vh] sm:h-[40vh] md:h-[30vh] lg:h-[25vh] xl:h-[20vh] w-full"
                slides-per-view="1"
                loop="true"
                navigation="true"
                pagination="true"
            >
                <swiper-slide className="flex items-center justify-center">
                    <div className="h-full w-full flex items-center justify-center">
                        <Image
                            src={cat}
                            alt="Cat"
                            layout="intrinsic"
                            width={500}
                            height={500}
                            className="responsive-img object-contain max-h-full max-w-full"
                        />
                    </div>
                </swiper-slide>
                <swiper-slide className="flex items-center justify-center">
                    <div className="h-full w-full flex items-center justify-center">
                        <Image
                            src={cat}
                            alt="Cat"
                            layout="intrinsic"
                            width={500}
                            height={500}
                            className="responsive-img object-contain max-h-full max-w-full"
                        />
                    </div>
                </swiper-slide>
                <swiper-slide className="flex items-center justify-center">
                    <div>Slide 3</div>
                </swiper-slide>
                <swiper-slide className="flex items-center justify-center">
                    <div>Slide 4</div>
                </swiper-slide>
                <swiper-slide className="flex items-center justify-center">
                    <div>Slide 5</div>
                </swiper-slide>
            </swiper-container>
        </div>
    );
};

export default SwiperComponent;