import { escape } from './helper';

export const customRenderer: any = {
    code(code: string, infostring: string, escaped: boolean) {
        const lang: any = (infostring || '').match(/\S*/)![0];
        // if (this.options.highlight) {
        //     const out = this.options.highlight(code, lang);
        //     if (out != null && out !== code) {
        //         escaped = true;
        //         code = out;
        //     }
        // }

        code = code.replace(/\n$/, '') + '\n';

        if (!lang) {
            return (
                '<pre class="md__pre"><code>' +
                (escaped ? code : escape(code, true)) +
                '</code></pre>\n'
            );
        }

        return (
            '<pre class="md__pre"><code class="' +
            escape(lang, true) +
            '">' +
            (escaped ? code : escape(code, true)) +
            '</code></pre>\n'
        );
    },

    heading(text: string, level: string) {
        return `
              <h${level} class="md__h${level}">
                ${text}
              </h${level}>`;
    },

    blockquote(text: string) {
        return `
      <blockquote class="md__blockquote">
        ${text}
      </blockquote>`;
    },

    hr() {
        return `<hr class="md__hr">`;
    },

    list(body: string, ordered: boolean, start: number) {
        const type = ordered ? 'ol' : 'ul',
            startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return (
            '<' +
            type +
            startatt +
            ` class='md__${type}'` +
            '>\n' +
            body +
            '</' +
            type +
            '>\n'
        );
    },

    paragraph(text: string) {
        return `<p class="md__p">${text}</p>`;
    },

    listitem(text: string) {
        return `<li class="md__li">${text}</li>\n`;
    },

    checkbox(checked: boolean) {
        return (
            '<input class="md__checkbox"' +
            (checked ? 'checked="" ' : '') +
            'disabled="" type="checkbox"' +
            '> '
        );
    },

    table(header: string, body: string) {
        if (body) body = `<tbody class="md__tbody">${body}</tbody>`;

        return (
            '<table class="md__table">\n' +
            '<thead class="md__thead">\n' +
            header +
            '</thead>\n' +
            body +
            '</table>\n'
        );
    },

    tablerow(content: string) {
        return `<tr class="md__tr">\n${content}</tr>\n`;
    },

    tablecell(content: string, flags: any) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
            ? `<${type} class="md__${type}" align="${flags.align}">`
            : `<${type}>`;
        return tag + content + `</${type}>\n`;
    },

    strong(text: string) {
        return `<strong class="md__strong">${text}</strong>`;
    },

    em(text: string) {
        return `<em class="md__em">${text}</em>`;
    },

    codespan(text: string) {
        return `<code class="md__code">${text}</code>`;
    },

    del(text: string) {
        return `<del class="md__code">${text}</del>`;
    },

    link(href: string, title: string, text: string) {
        if (href === null) {
            return text;
        }
        let out = '<a class="md__a" href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    },

    image(href: string, title: string, text: string) {
        if (href === null) {
            return text;
        }

        let out = `<img src="${href}" class="md__img" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += '>';
        return out;
    },
};