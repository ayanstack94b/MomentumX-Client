"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileAvatar({
    src,
    alt,
    size = 48,
    className = "",
}) {
    const [imageSrc, setImageSrc] = useState(
        src || "/images/default-avatar.png"
    );

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={size}
            height={size}
            className={className}
            onError={() => {
                setImageSrc("/images/default-avatar.png");
            }}
        />
    );
}