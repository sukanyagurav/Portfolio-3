import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  frameClassName: string;
  imageClassName: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function ProjectImage({
  src,
  alt,
  frameClassName,
  imageClassName,
  loading = 'lazy',
  fetchPriority = 'auto',
}: ProjectImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`project-image-frame ${frameClassName}`}>
      {!isLoaded && <div className="project-image-skeleton" aria-hidden="true" />}
      {hasError ? (
        <div
          role="img"
          aria-label={`${alt} unavailable`}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          Preview unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`relative z-10 ${imageClassName} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        />
      )}
    </div>
  );
}
