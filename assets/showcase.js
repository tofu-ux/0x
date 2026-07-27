/* Interactive behavior for the 0x showcase. Not required by components.css. */
(() => {
    "use strict";

    const status = document.querySelector("[data-copy-status]");

    const announce = (message) => {
        if (!status) return;
        status.textContent = message;
    };

    const copyText = async (text) => {
        if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard API unavailable");
        }
        await navigator.clipboard.writeText(text);
    };

    document.querySelectorAll("[data-copy-code]").forEach((button) => {
        button.addEventListener("click", async () => {
            const recipe = button.closest("[data-recipe]");
            const code = recipe?.querySelector("code");
            if (!code) return;

            try {
                await copyText(code.textContent || "");
                button.textContent = "copied";
                announce(`${button.dataset.copyCode || "Example"} copied.`);
                window.setTimeout(() => {
                    button.textContent = "copy";
                }, 1600);
            } catch (_) {
                announce("Copy failed. Select the source manually.");
            }
        });
    });

    document.querySelectorAll("[data-dialog-open]").forEach((button) => {
        button.addEventListener("click", () => {
            const dialog = document.getElementById(button.dataset.dialogOpen || "");
            if (dialog instanceof HTMLDialogElement) dialog.showModal();
        });
    });

    document.querySelectorAll("[data-dialog-close]").forEach((button) => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog instanceof HTMLDialogElement) dialog.close();
        });
    });
})();
