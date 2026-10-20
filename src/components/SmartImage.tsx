import React, { useState } from 'react';

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  aspectRatio?: string;
  objectPosition?: string;
  className?: string;
  containerClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  aspectRatio,
  objectPosition = 'center',
  className = '',
  containerClassName = '',
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#ECE6DB] ${containerClassName}`}
      style={{
        aspectRatio: aspectRatio,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      {/* Soft blur-up shimmer / placeholder state */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-gradient-to-tr from-[#E3DCce] via-[#EFE9DF] to-[#E5DFC8] animate-pulse"
        />
      )}

      {/* Error fallback: resilient nature gradient with title and alt description */}
      {hasError ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#204128] via-[#3B5B3F] to-[#4E6E50] text-[#FAF7F2]"
        >
          <svg
            className="w-8 h-8 mb-2 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <span className="text-xs uppercase tracking-widest font-medium opacity-75">Meadowbrook Farm</span>
          <p className="mt-1 text-xs opacity-90 max-w-[85%] line-clamp-2">{alt}</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            objectPosition,
            ...style,
          }}
          className={`w-full h-full object-cover farm-photo-grade transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
