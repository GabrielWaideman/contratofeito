/**
 * Comprime e redimensiona uma imagem no navegador antes do upload.
 * Reduz arquivos pesados (ex: 10MB a 20MB tirados em smartphones) para ~300KB - 700KB,
 * evitando erros de limite de payload (HTTP 413 Request Entity Too Large) e acelerando o upload.
 */
export async function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.82
): Promise<File> {
  // Ignora se não for imagem ou se for SVG / GIF animado
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }

  // Se o arquivo já for muito leve (menor que 350KB), não precisa reprocessar
  if (file.size <= 350 * 1024) {
    return file
  }

  // Se o ambiente não tiver suporte a window/document/canvas, retorna o arquivo original
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        let { width, height } = img

        // Redimensionamento proporcional mantendo o aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(file)
          return
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        const outputType = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg'
        const baseName = file.name.replace(/\.[^/.]+$/, '')
        const outputExt = outputType === 'image/webp' ? '.webp' : '.jpg'
        const outputName = `${baseName}${outputExt}`

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file)
              return
            }

            // Se o arquivo comprimido ficou maior que o original, mantém o original
            if (blob.size >= file.size) {
              resolve(file)
              return
            }

            const compressedFile = new File([blob], outputName, {
              type: outputType,
              lastModified: Date.now(),
            })

            resolve(compressedFile)
          },
          outputType,
          quality
        )
      }

      img.onerror = () => {
        resolve(file)
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      resolve(file)
    }

    reader.readAsDataURL(file)
  })
}

