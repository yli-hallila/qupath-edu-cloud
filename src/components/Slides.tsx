import { Image, getSlideId } from "types";
import { Link, useParams } from "react-router-dom";
import Slugs from "lib/slugs";
import { genPath } from "lib/atoms";

interface SlidesProps {
    images?: Image[];
    onSlideChange: (newSlide: string) => void;
}

function Slides({ images, onSlideChange }: SlidesProps) {
    const slugs = useParams<Slugs>();

    return (
        <div id="Slides">
            {images ? (
                <>
                    {images.map((slide) => (
                        <Link
                            to={genPath(slugs, { slide: getSlideId(slide) })}
                            key={slide.entryID}
                            className="grid grid-cols-6 p-2 border-b border-t mb-2 cursor-pointer"
                        >
                            <div className="col-span-1">
                                {slide.thumbnail && (
                                    <img src={`data:image/png;base64,${slide.thumbnail}`} width="64px" alt="" />
                                )}
                            </div>

                            <div className="col-span-5">
                                <p>{slide.imageName}</p>
                                <p className="font-light text-xs">{slide.description}</p>
                            </div>
                        </Link>
                    ))}
                </>
            ) : (
                <p>No slides</p>
            )}
        </div>
    );
}

export default Slides;
