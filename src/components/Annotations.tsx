import React from "react";
import { Annotation } from "../types";

interface AnnotationsProps {
    annotations?: Annotation[];
}

function Annotations({ annotations }: AnnotationsProps) {
    return (
        <div id="Annotations">
            {annotations ? (
                <>
                    <p className="text-xl p-4">Annotations</p>
                    {annotations.map((annotation) => (
                        <div key={annotation.properties.name} className="grid grid-cols-4 p-2 border-b border-t mb-2">
                            <div className="col-span-4">
                                {annotation.properties.name ? (
                                    <p>
                                        {annotation.geometry.type}: {annotation.properties.name}
                                    </p>
                                ) : (
                                    <p>{annotation.geometry.type}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p>No annotations</p>
            )}
        </div>
    );
}

export default Annotations;
