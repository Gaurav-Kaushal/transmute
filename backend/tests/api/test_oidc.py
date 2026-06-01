from api.routes.oidc import _coerce_username_claim


def test_coerce_username_claim_normalizes_supported_values():
    assert _coerce_username_claim("  alice  ") == "alice"
    assert _coerce_username_claim(["  eng ", " staff "]) == "eng.staff"
    assert _coerce_username_claim(True) == "True"


def test_coerce_username_claim_rejects_empty_and_object_values():
    assert _coerce_username_claim("   ") is None
    assert _coerce_username_claim([]) is None
    assert _coerce_username_claim({"nested": "value"}) is None