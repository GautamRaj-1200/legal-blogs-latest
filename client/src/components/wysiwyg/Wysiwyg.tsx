import React, { useRef, useState } from 'react';
import { uploadToS3 } from '../../utils/s3Upload';
import styles from './Wysiwyg.module.css';

const WysiwygEditor = ({ setContent }: { setContent: (content: string) => void }) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptConfig, setPromptConfig] = useState<{
    tagName: string;
    placeholder: string;
    transformFn: ((el: HTMLElement, value: string) => void) | null;
  }>({
    tagName: '',
    placeholder: '',
    transformFn: null,
  });
  const [promptValue, setPromptValue] = useState('');
  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const format = (formatOption: string) => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (!textContainerRef.current?.contains(range.commonAncestorContainer)) return;

    if (formatOption === 'B') {
      const strong = document.createElement('strong');
      strong.appendChild(range.extractContents());
      range.insertNode(strong);
    } else if (formatOption === 'I') {
      const em = document.createElement('em');
      em.appendChild(range.extractContents());
      range.insertNode(em);
    } else if (formatOption === 'U') {
      const underline = document.createElement('u');
      underline.appendChild(range.extractContents());
      range.insertNode(underline);
    } else if (formatOption === 'HL') {
      // Highlight logic would go here
    }
  };

  const handlePromptAndInsert = (
    tagName: string,
    placeholderText: string,
    transformFn: ((el: HTMLElement, value: string) => void) | null = null
  ) => {
    if (tagName === 'hr') {
      const hr = document.createElement('hr');
      hr.className = styles.horizontalRule;
      textContainerRef.current?.appendChild(hr);
      return;
    }
    setPromptConfig({ tagName, placeholder: placeholderText, transformFn });
    setShowPrompt(true);
    setPromptValue('');
    setIsOkDisabled(true);
  };

  const handlePromptOk = () => {
    const { tagName, transformFn } = promptConfig;
    const division = document.createElement('div');
    division.className = styles.imageContainer;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Del';
    deleteBtn.className = styles.deleteButton;
    deleteBtn.onclick = () => {
      division.remove();
    };

    const el = document.createElement(tagName);
    if (tagName === 'h1') {
      el.className = styles.heading1;
    } else if (tagName === 'h2') {
      el.className = styles.heading2;
    } else if (tagName === 'h3') {
      el.className = styles.heading3;
    } else if (tagName === 'p') {
      el.className = styles.paragraph;
    } else if (tagName === 'ul') {
      el.className = styles.unorderedList;
    } else if (tagName === 'ol') {
      el.className = styles.orderedList;
    } else if (tagName === 'pre') {
      el.className = styles.codeBlock;
    }
    if (transformFn) {
      transformFn(el, promptValue);
    } else {
      el.textContent = promptValue;
    }

    el.contentEditable = 'true';
    division.appendChild(el);
    division.appendChild(deleteBtn);
    textContainerRef.current?.appendChild(division);

    setShowPrompt(false);
    setPromptValue('');
  };

  const handlePromptCancel = () => {
    setShowPrompt(false);
    setPromptValue('');
  };

  const handlePromptInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(e.target.value);
    setIsOkDisabled(e.target.value.trim() === '');
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) {
        if (fileInput.parentNode) {
          document.body.removeChild(fileInput);
        }
        return;
      }

      const placeholderId = `upload-${String(Date.now())}`;
      const placeholder = document.createElement('div');
      placeholder.id = placeholderId;
      placeholder.textContent = 'Uploading image...';
      placeholder.className = styles.uploadPlaceholder;
      textContainerRef.current?.appendChild(placeholder);

      try {
        const publicUrl = await uploadToS3(file);

        const currentPlaceholder = document.getElementById(placeholderId);
        if (!currentPlaceholder) return;

        const division = document.createElement('div');
        division.className = styles.imageContainer;

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'Del';
        deleteBtn.className = styles.deleteButton;
        deleteBtn.onclick = () => {
          division.remove();
        };

        const img = document.createElement('img');
        img.src = publicUrl;
        img.alt = file.name;
        img.className = styles.image;

        division.appendChild(img);
        division.appendChild(deleteBtn);

        currentPlaceholder.replaceWith(division);
      } catch (error) {
        console.error('Image upload failed:', error);
        const failedPlaceholder = document.getElementById(placeholderId);
        if (failedPlaceholder) {
          failedPlaceholder.textContent = 'Image upload failed. Please try again.';
          failedPlaceholder.className = styles.uploadError;
          setTimeout(() => {
            failedPlaceholder.remove();
          }, 3000);
        }
      } finally {
        if (fileInput.parentNode) {
          document.body.removeChild(fileInput);
        }
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
  };

  const handleSave = () => {
    if (textContainerRef.current) {
      const clonedNode = textContainerRef.current.cloneNode(true) as HTMLElement;

      clonedNode.querySelectorAll('div').forEach((element) => {
        (element as HTMLElement).removeAttribute('class');
      });
      clonedNode.querySelectorAll('[contentEditable=true]').forEach((element) => {
        (element as HTMLElement).contentEditable = 'false';
      });
      clonedNode.querySelectorAll('button').forEach((element) => {
        element.remove();
      });

      const editorData = {
        content: clonedNode.innerHTML,
      };

      // Preserve whitespace in code blocks
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = editorData.content;
      tempDiv.querySelectorAll('pre').forEach((pre) => {
        pre.style.whiteSpace = 'pre';
        pre.style.tabSize = '4';
      });
      editorData.content = tempDiv.innerHTML;

      setContent(editorData.content);
    }
  };

  const handleClear = () => {
    if (textContainerRef.current) {
      textContainerRef.current.innerHTML = '';
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('h1', 'Enter heading 1...');
          }}
        >
          H1
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('h2', 'Enter heading 2...');
          }}
        >
          H2
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('h3', 'Enter heading 3...');
          }}
        >
          H3
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('p', 'Enter paragraph...');
          }}
        >
          P
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('ol', 'Enter comma-separated list items...', (el, value) => {
              const items = value.split(',').map((item) => item.trim());
              items.forEach((text) => {
                const li = document.createElement('li');
                li.textContent = text;
                el.appendChild(li);
              });
            });
          }}
        >
          List
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('ul', 'Enter comma-separated list items...', (el, value) => {
              const items = value.split(',').map((item) => item.trim());
              items.forEach((text) => {
                const li = document.createElement('li');
                li.textContent = text;
                el.appendChild(li);
              });
            });
          }}
        >
          Numbered
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('hr', '');
          }}
        >
          Rule
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            handlePromptAndInsert('pre', 'Enter code...', (el, value) => {
              const code = document.createElement('code');
              const formattedValue = value.replace(/\t/g, '    ');
              code.textContent = formattedValue;
              el.appendChild(code);
              el.className = styles.codeBlock;
            });
          }}
        >
          Code
        </button>

        <button type="button" className={styles.toolbarButton} onClick={handleImageUpload}>
          Image
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            format('B');
          }}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            format('I');
          }}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            format('U');
          }}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            format('HL');
          }}
        >
          <span>HL</span>
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${styles.toolbarButtonRed}`}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      <div className={styles.editorContent} ref={textContainerRef}>
        {/* Content will be appended here */}
      </div>

      {showPrompt && (
        <div className={styles.promptOverlay}>
          <textarea
            className={styles.promptTextarea}
            placeholder={promptConfig.placeholder}
            value={promptValue}
            onChange={handlePromptInputChange}
            autoFocus
          />
          <div className={styles.promptButtons}>
            <button
              type="button"
              className={`${styles.toolbarButton} ${styles.toolbarButtonGreen}`}
              onClick={handlePromptOk}
              disabled={isOkDisabled}
            >
              OK
            </button>
            <button
              type="button"
              className={`${styles.toolbarButton} ${styles.toolbarButtonRed}`}
              onClick={handlePromptCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button type="button" className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default WysiwygEditor;
