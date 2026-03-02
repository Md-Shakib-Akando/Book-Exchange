export default function SuccessState({ mode, form }) {
    return (
        <div className="text-center py-10 space-y-5">
            <div className="text-5xl">📚</div>
            <h3 className="font-serif text-3xl">
                {mode === "login" ? "Welcome back." : "Welcome to Folio."}
            </h3>
            <p className="italic text-[#7a7060]">
                Your library awaits, {form.name || "reader"}.
            </p>
        </div>
    );
}