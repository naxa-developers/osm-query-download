/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import Logo from '@src/assets/img/naxa-mapper-logo.svg';
import NorthArrow from './north-arrow.svg';

export function generateMapThumbnail(map) {
  return new Promise(resolve => {
    map.once('rendercomplete', () => {
      // const dim = [210, 148];
      // const resolution = 72;
      // const width = Math.round((dim[0] * resolution) / 25.4);
      // const height = Math.round((dim[1] * resolution) / 25.4);
      const mapCanvas = document.createElement('canvas');
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        canvas => {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix,
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        },
      );
      if (navigator.msSaveBlob) {
        // link download attribuute does not work on MS browsers
        // navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
      } else {
        // const base64 = mapCanvas.toDataURL();
        mapCanvas.toBlob(blob => {
          const file = new File([blob], 'thumbnail.png', { type: 'image/png' });
          resolve(file);
        });
      }
    });
    map.renderSync();
  });
}

const exportOptions = {
  title: '',
  layout: 'landscape',
  pageSize: 'a4',
  resolution: '150',
  legend: true,
  northArrow: true,
  scaleBar: true,
};

function calculateFrom150(input, dpi) {
  return (input / 150) * dpi;
}

export function exportMap(map, options = exportOptions) {
  return new Promise(resolve => {
    const dims = {
      a0: [1189, 841],
      a1: [841, 594],
      a2: [594, 420],
      a3: [420, 297],
      a4: [297, 210],
      a5: [210, 148],
    };
    const format = options.pageSize;
    const dpi = options.resolution;
    const dim = dims[format];
    const dimWidth = options.layout === 'portrait' ? dim[1] : dim[0];
    const dimHeight = options.layout === 'portrait' ? dim[0] : dim[1];
    const width = Math.round((dimWidth * dpi) / 25.4);
    const height = Math.round((dimHeight * dpi) / 25.4);
    const size = map.getSize();
    const viewResolution = map.getView().getResolution();
    const filename =
      options?.title?.toLowerCase()?.split(' ').join('-') || 'map';

    const titleRectFillSize = calculateFrom150(50, dpi);
    const titleFontSize = calculateFrom150(36, dpi);
    const titleTextHeightOffset = calculateFrom150(36, dpi);
    const legendScale = calculateFrom150(1.5, dpi);
    const legendOffset = calculateFrom150(50, dpi);
    const northArrowWidth = calculateFrom150(50, dpi);
    const northArrowWidthOffset = calculateFrom150(150, dpi);
    const northArrowHeightOffset = calculateFrom150(100, dpi);
    const scaleBarHeightOffset = calculateFrom150(50, dpi);
    const borderWidth = calculateFrom150(50, dpi);
    const logoWidth = calculateFrom150(230, dpi);
    const logoWidthOffset = calculateFrom150(343, dpi);
    const logoHeightOffset = calculateFrom150(140, dpi);
    const watermarkTextFontSize = calculateFrom150(18, dpi);
    const watermarkTextWidthOffset = calculateFrom150(390, dpi);
    const watermarkTextHeightOffset = calculateFrom150(60, dpi);

    let transformedHeight;
    let transformedWidth;

    map.once('rendercomplete', () => {
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      const mapContext = mapCanvas.getContext('2d');
      const olCanvasEl = document.querySelectorAll('.ol-layer canvas');
      let loopCount = 0;

      async function prepareMap() {
        window.scrollTo(0, 0);
        // padding
        mapContext.lineWidth = borderWidth;
        mapContext.strokeStyle = '#fff';
        mapContext.strokeRect(0, 0, transformedWidth, transformedHeight);

        // map title
        if (options.title) {
          mapContext.fillStyle = '#FFF';
          mapContext.fillRect(0, 0, transformedWidth, titleRectFillSize);
          mapContext.font = `${titleFontSize}px Montserrat, sans-serif`;
          mapContext.fillStyle = 'black';
          const titleWidth = mapContext.measureText(options.title).width;
          mapContext.fillText(
            options.title,
            transformedWidth * 0.5 - titleWidth * 0.5,
            titleTextHeightOffset,
          );
        }

        // legend
        if (options.legend) {
          const legend = document.getElementById('map-legend');
          const legendCanvas = await html2canvas(legend, {
            scale: legendScale * 1.1,
            useCORS: true,
            onclone: () => new Promise(res => setTimeout(() => res(), 400)),
          });
          mapContext.drawImage(
            legendCanvas,
            legendOffset,
            transformedHeight - legendCanvas.height - legendOffset,
          );
        }

        // scalebar
        const scaleBar = document.querySelector('.ol-scale-bar');
        if (options.scaleBar) {
          const scaleBarCanvas = await html2canvas(scaleBar, {
            scale: legendScale,
            backgroundColor: 'transparent',
            onclone: () => new Promise(res => setTimeout(() => res(), 400)),
          });
          mapContext.drawImage(
            scaleBarCanvas,
            transformedWidth / 2 - scaleBarCanvas.width / 2,
            transformedHeight - scaleBarCanvas.height - scaleBarHeightOffset,
          );
          // scalebar text
          const scaleBarText = document.querySelector('.ol-scale-text');
          const scaleBarTextCanvas = await html2canvas(scaleBarText, {
            scale: legendScale,
            backgroundColor: 'transparent',
            onclone: () => new Promise(res => setTimeout(() => res(), 400)),
          });
          mapContext.drawImage(
            scaleBarTextCanvas,
            transformedWidth / 2 - scaleBarTextCanvas.width / 2,
            transformedHeight -
              scaleBarTextCanvas.height -
              scaleBarCanvas.height -
              scaleBarHeightOffset,
          );
        }

        // north arrow
        if (options.northArrow) {
          const img = new Image();
          // img.crossOrigin = 'anonymous';
          img.src = NorthArrow;
          await img.decode();
          mapContext.drawImage(
            img,
            transformedWidth - northArrowWidthOffset,
            northArrowHeightOffset,
            northArrowWidth * 0.88,
            (northArrowWidth * img.height) / img.width,
          );
        }

        // watermark
        const logo = new Image();
        logo.src = Logo;
        await logo.decode();
        mapContext.shadowColor = '#b3afaf';
        mapContext.shadowBlur = 5;
        mapContext.drawImage(
          logo,
          transformedWidth - logoWidthOffset,
          transformedHeight - logoHeightOffset,
          logoWidth,
          (logoWidth * logo.height) / logo.width,
        );
        mapContext.font = `${watermarkTextFontSize}px Montserrat, sans-serif`;
        mapContext.shadowColor = 'black';
        mapContext.shadowBlur = 8;
        mapContext.fillStyle = 'white';
        mapContext.fillText(
          'Downloaded from naxamapper.com',
          transformedWidth - watermarkTextWidthOffset,
          transformedHeight - watermarkTextHeightOffset,
        );

        if (navigator.msSaveBlob) {
          // link download attribuute does not work on MS browsers
          navigator.msSaveBlob(mapCanvas.msToBlob(), `${filename}.png`);
        } else {
          mapCanvas.toBlob(blob => {
            const file = new File([blob], `${filename}.png`, {
              type: 'image/png',
            });
            saveAs(file);
            resolve();
          });
        }

        // Reset original map size
        map.setSize(size);
        map.getView().setResolution(viewResolution);
        document.body.style.cursor = 'auto';
      }

      Array.prototype.forEach.call(olCanvasEl, canvas => {
        loopCount += 1;
        if (canvas.width > 0) {
          const opacity = canvas.parentNode.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          const transform = canvas.style.transform;
          // Get the transform parameters from the style's transform matrix
          const matrix = transform
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(',')
            .map(Number);
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix,
          );
          transformedHeight = canvas.height;
          transformedWidth = canvas.width;
          mapContext.drawImage(canvas, 0, 0);
        }
        if (loopCount === olCanvasEl.length) {
          prepareMap();
        }
      });
    });

    // Set print size
    const printSize = [width, height];
    map.setSize(printSize);
    const scaling = Math.min(width / size[0], height / size[1]);
    map.getView().setResolution(viewResolution / scaling);
  });
}
