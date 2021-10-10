import React from "react";

function Slides({ slides, OnSlideChange }) {
    return (
        <div id="Slides">
            {slides ? (
                <>
                    <p className="text-xl p-4">Slides</p>

                    {slides.map((slide) => (
                        <div
                            className="grid grid-cols-6 p-2 border-b border-t mb-2 cursor-pointer"
                            onClick={() => OnSlideChange(slide.serverBuilder.uri)}
                        >
                            <div className="col-span-1">
                                <img src={"data:image/png;base64," + slide.thumbnail} width="64px" alt="" />
                            </div>

                            <div className="col-span-5">
                                <p>{slide.imageName}</p>
                                <p className="font-light text-xs">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p>No slides</p>
            )}
        </div>
    );
}

export default Slides;
