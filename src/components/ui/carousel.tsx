"use client";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ComponentProps, ComponentPropsWithoutRef, ComponentRef, createContext, HTMLAttributes, KeyboardEvent, Ref, useCallback, use, useEffect, useState } from "react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
	const context = use(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
};

const Carousel = ({
	ref,
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: ComponentPropsWithoutRef<"div"> &
	CarouselProps & {
		ref?: Ref<ComponentRef<"div">>;
	}) => {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins
	);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) {
			return;
		}

		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext]
	);

	useEffect(() => {
		if (!api || !setApi) {
			return;
		}

		setApi(api);
	}, [api, setApi]);

	useEffect(() => {
		if (!api) {
			return;
		}

		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
        (<CarouselContext
			value={{
				carouselRef,
				api: api,
				opts,
				orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
            <div ref={ref} onKeyDownCapture={handleKeyDown} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
				{children}
			</div>
        </CarouselContext>)
    );
};
Carousel.displayName = "Carousel";

const CarouselContent = ({
	ref,
	className,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
}) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div ref={ref} className={cn("flex gap-2", orientation === "horizontal" ? "flex-row" : "flex-col", className)} {...props} />
		</div>
	);
};
CarouselContent.displayName = "CarouselContent";

const CarouselItem = ({
	ref,
	className,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	ref?: Ref<HTMLDivElement>;
}) => {
	return <div ref={ref} role="group" aria-roledescription="slide" className={cn("flex flex-none items-center justify-center", className)} {...props} />;
};
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = ({
	ref,
	className,
	variant = "outline",
	size = "icon",
	...props
}: ComponentProps<typeof Button> & {
	ref?: Ref<HTMLButtonElement>;
}) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ChevronLeft size={16} />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
};
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = ({
	ref,
	className,
	variant = "outline",
	size = "icon",
	...props
}: ComponentProps<typeof Button> & {
	ref?: Ref<HTMLButtonElement>;
}) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ChevronRight size={16} />
			<span className="sr-only">Next slide</span>
		</Button>
	);
};
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
