

jQuery(function ($) {

    var form = window.form || {};
    function equalHeight(group) {
        tallest = 0;
        group.each(function () {
            thisHeight = $(this).height();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    }

    form.inputMark = function () {
        $('.input-group-addon-text input[type=text], .input-group-addon-text input[type=email], .input-group-addon-text input[type=phone], .input-group-addon-text input[type=number]').on('click', function () {
            $parent = $(this).parents('.input-group-addon-text');
            $checkbox = $parent.find('input[type=checkbox]');
            if ($checkbox.length > 0) {
                $checkbox.removeAttr('checked').prop('checked', false);
                $checkbox.attr('checked', 'checked').prop('checked', true);
            }

            $radio = $parent.find('input[type=radio]');
            if ($radio.length > 0) {
                $radio.removeAttr('checked').prop('checked', false);
                $radio.attr('checked', 'checked').prop('checked', true);
            }
        });
    }


    form.selectBox = function () {
        if ($('select.form-control').length > 0)
        {
            $('select.form-control').customSelect({customClass: 'selectclass'});
            /*$('select.form-control').each(function(i, select){
             $(select).parent().css('width', $(select).width()+'px');
             }); */
            $('select.form-control').on('click', function (e) {
                e.preventDefault();
            });
        }
    }

    form.selectBoxWidth = function () {
        var windowWidth = $(window).width();
        $('select').each(function (i, el) {
            var oldData = $(el).attr('name');
            if (!oldData)
                return;
            var oldWidth = $(el).next('.selectclass').css('width').replace('px', '');
            if ((windowWidth - 20) < oldWidth) {
                $(this).addClass('select-fullwidth').next('.selectclass').addClass('select-fullwidth');
                $(this).next('.selectclass').children('.selectclassInner').addClass('select-fullwidth-inner');
                $('.inner[data-select="' + oldData + '"]').addClass('select-fullwidth');
                $('.help-block[data-select="' + oldData + '"]').addClass('select-fullwidth');
            } else {
                $(this).removeClass('select-fullwidth').next('.selectclass').removeClass('select-fullwidth');
                $(this).next('.selectclass').children('.selectclassInner').removeClass('select-fullwidth-inner');
                $('.inner[data-select="' + oldData + '"]').removeClass('select-fullwidth');
                $('.help-block[data-select="' + oldData + '"]').removeClass('select-fullwidth');
            }
        });

    }
    form.selectBoxValidate = function () {
        $('select').on('change', function () {
            var selectName = $(this).attr('name');
            if ($(this).val()) {
                if ($(this).val() != 'textova') {
                    $(this).next().addClass('selectclassActive').removeClass('input-group-addon-text');
                    $('.inner[data-select="' + selectName + '"]').parent().fadeOut();

                } else {
                    if ($('.inner[data-select="' + selectName + '"] input').val().length == 0) {
                        $(this).next().removeClass('selectclassActive').addClass('input-group-addon-text');
                    } else {
                        $(this).next().addClass('selectclassActive').addClass('input-group-addon-text');
                    }
                    $('.inner[data-select="' + selectName + '"]').parent().fadeIn();
                }
            } else {
                $(this).next().removeClass('selectclassActive').removeClass('input-group-addon-text');
                $('.inner[data-select="' + selectName + '"]').parent().fadeOut();
            }
            ;
        }).each(function (i, el) {
            var selectName = $(el).attr('name');
            if ($(el).val()) {
                if ($(el).val() != 'textova') {
                    $(el).next().addClass('selectclassActive').removeClass('input-group-addon-text');
                    $('.inner[data-select="' + selectName + '"]').parent().fadeOut();
                } else
                {
                    if ($('.inner[data-select="' + selectName + '"] input').val().length == 0) {
                        $(el).next().removeClass('selectclassActive').addClass('input-group-addon-text');
                    } else {
                        $(el).next().addClass('selectclassActive').addClass('input-group-addon-text');
                    }
                    $('.inner[data-select="' + selectName + '"]').addClass('inner-active').parent().show();
                }
            }
        });

        $('input.select-text').on('change keyup', function () {
            var parentData = $(this).parent().attr('data-select');
            if ($(this).val().length > 0) {
                $('select[name="' + parentData + '"]').next().addClass('selectclassActive');
                $(this).parent().addClass('inner-active');
            } else {
                if ($('select[name="' + parentData + '"]').val() == 'textova') {
                    $('select[name="' + parentData + '"]').next().removeClass('selectclassActive');
                }
                $(this).parent().removeClass('inner-active');
            }

        });
    }

    form.inputCounter = function () {
        $('input.counter, textarea.counter').on('change keyup', function (e) {
            var val = $(this).val().replace(/(?:\r\n|\r|\n)/g, '')
            var count = val.length
            var allowed = parseInt($(this).data('maxlength'))
            var remain = allowed - count;
            document.querySelector('strong[data-name=\'' + this.name + '\']').innerHTML = remain
            if (remain < 1 && e.which && e.which != 13) {
                e.preventDefault();
            }
        }).each(function (i, el) {
            $(el).data('maxlength', $(el).attr('maxlength'));
        }).change();
    }

    form.inputValidate = function () {
        $('input.validate, textarea.validate').on('change keyup', function () {
            var motherDiv = $(this).attr('name');
            if ($(this).is('textarea') == true) {
                var motherDivAdd = 'input-group-textarea-active';
            } else {
                var motherDivAdd = 'input-group-text-active';
            }
            if ($(this).val().length > 0) {
                $('label[data-for="' + motherDiv + '"]').addClass(motherDivAdd);
            } else {
                $('label[data-for="' + motherDiv + '"]').removeClass(motherDivAdd);
            }
        }).change();
    }

    form.inputValidateStart = function () {
        $('input.validate').each(function () {
            if ($(this).val().length > 0) {
                var onStartInputDiv = $(this).parents('.input-group-text').attr('data-for');
                $('label[data-for="' + onStartInputDiv + '"]').addClass('input-group-text-active');
            }
        });
    }

    form.inputImageRadio = function () {
        $('.row input.imageradio').change(function () {
            var imageVal = $(this).attr('id');
            // uncheck all 
            $(this).parents('.row').find('label').removeClass('input-image-active');
            if ($(this).prop('checked') == true) {
                $('label[for="' + imageVal + '"]').addClass('input-image-active').removeClass('input-image-border-hover');
                $('input[id="' + imageVal + '"]').parent().removeClass('input-image-hover');
            }
        });

        $('.row label.input-image').hover(function () {
            var imageName = $(this).attr('for');
            if ($('input[id="' + imageName + '"]').prop('checked') == false) {
                $('input[id="' + imageName + '"]').parent().toggleClass('input-image-hover');
                $('label.input-image[for="' + imageName + '"]').toggleClass('input-image-border-hover');
            } else {
                if ($('input[id="' + imageName + '"]').prop('checked') == true && $('input[id="' + imageName + '"]').parent().hasClass('input-image-hover')) {
                    $('input[id="' + imageName + '"]').parent().removeClass('input-image-hover');
                    $('label.input-image[for="' + imageName + '"]').removeClass('input-image-border-hover');
                }
            }
        });
    }


    form.inputMatrix = function () {


        $('input.matrix').change(function () {
            var thisParent = $(this).parents('.matrix-values');
            thisParent.find('.input-group-title-main').removeClass('data-title-active');
            thisParent.find('.title').removeClass('data-row-active');
            thisParent.find('input.matrix:checked').each(function () {
                if ($(this).prop('checked') == true) {
                    var rowY = $(this).attr('data-title');
                    var rowX = $(this).attr('data-row');
                    thisParent.find('.data-title-' + rowY).addClass('data-title-active');
                    thisParent.find('.data-row-' + rowX).addClass('data-row-active');
                }
            });
        });



        $('input.matrixtext').blur(function () {
            var thisParent = $(this).parents('.matrix-values');
            thisParent.find('.input-group-title-main').removeClass('data-title-active');
            thisParent.find('.title').removeClass('data-row-active');
            thisParent.find('input.matrixtext').removeClass('matrixtext-active');
            thisParent.find('input.matrixtext').each(function () {
                if ($(this).val().length > 0) {
                    var rowY = $(this).attr('data-title');
                    var rowX = $(this).attr('data-row');
                    $(this).addClass('matrixtext-active');
                    thisParent.find('.data-title-' + rowY).addClass('data-title-active');
                    thisParent.find('.data-row-' + rowX).addClass('data-row-active');
                }
            });
        });



        $('.addon-matrix, input.matrixtext').on('mouseover', function () {
            var thisParent = $(this).parents('.matrix-values');
            var rowY = $(this).attr('data-title');
            var rowX = $(this).attr('data-row');
            thisParent.find('.data-title-' + rowY).addClass('data-title-hover');
            thisParent.find('.data-row-' + rowX).addClass('data-row-hover');
        });

        $('.addon-matrix, input.matrixtext').on('mouseout', function () {
            var thisParent = $(this).parents('.matrix-values');
            var rowY = $(this).attr('data-title');
            var rowX = $(this).attr('data-row');
            thisParent.find('.data-title-' + rowY).removeClass('data-title-hover');
            thisParent.find('.data-row-' + rowX).removeClass('data-row-hover');
        });



        $('.matrix-values').each(function () {
            var thisId = $(this).attr('id');

            var checkLabel = $(this).find('input.matrix[data-row=1]').length;
            if (checkLabel == 0) {
                var checkLabel = $(this).find('input.matrixtext[data-row=1]').length;
            }

            var percent = 100 / checkLabel;

            $(this).find('.title-groups').css('width', percent + '%');

        });
    }


    form.matrixInputPosition = function () {
        $('.matrix-values .input-group-matrix').each(function () {
            var titleHeight = $(this).find('.title').outerHeight();
            if (titleHeight != null) {
                $(this).find('label').css('height', titleHeight + 'px');
                $(this).find('label').css('vertical-align', 'middle');
            }
        });
    }

    form.divide = function () {
        if ($('.row-divide').length) {
            $('.row-divide .divide-item .divide-title').css('height', 'auto');
            if ($(window).width() >= 768) {
                $('.row-divide').each(function () {
                    var j = 0;
                    for (i = 0; i <= Math.round($('.row-divide').find('.divide-item .divide-title').length / 2); i++) {
                        equalHeight($(this).find('.divide-item:eq(' + (i + j) + ') .divide-title,.divide-item:eq(' + (i + j + 1) + ') .divide-title'));
                        j = j + 1;
                    }
                });
            }
        }
    }

    $(window).resize(function () {
        form.inputStarRating();
    });


    $(document).ready(function () {
        var windowWidth = $(window).width();
        form.selectBox();
        form.selectBoxWidth();
        form.inputCounter();
        form.inputValidate();
        form.selectBoxValidate();
        form.inputValidateStart();
        form.inputImageRadio();
        form.inputMatrix();
        form.inputMark();
        form.divide();
        alertEscolha();
        marca(element);
        $('.input-group-checkbox, .input-group-radio').click(function (e) {
            if ($(this).find('input:checked').length == 1)
                $(this).find('.text-addon input').focus();
        });


        $('.input-group-checkbox').on('click', function (e) {
            if ($(e.target).is(':text') && $(this).find('input:checked').length == 1)
            {
                e.preventDefault();
            }
        });

        $incompleteBlock = $('fieldset:has(.alert):first');
        if ($incompleteBlock.length > 1)
        {
            window.scrollTo(0, $incompleteBlock.offset().top);
        }
    });

    var clicked;
    $('button').click(function ()
    {
        clicked = $(this);
    });

    $('input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // determining if "Previous" button was used to submit the form
    var back = false;
    $('form button').on('click touch', function (e) {
        back = $(this).parent().is('.previous');
    });

    $('form').submit(function (e) {

        $form = $(this);

        if (back)
            return true;

        var invalid = [];

        $(this).find('fieldset').each(function (i, block) {
            $block = $(block);

            if ($block.find('input, select, textarea').length == 0)
                return;

            if ($block.find('.drag').length == 1)
                return;

            if (!validate($block))
            {
                invalid.push({block: $block});
            }

            $(block).on('mouseup click keyup keypress drag dragover drop', (function ($block) {
                return function () {
                    validate($block);
                }
            })($block));

        });

        if (invalid.length > 0) {
            window.scrollTo(0, invalid[0].block.offset().top);
            e.preventDefault();
        } else
        {
            /* var height = $('ul.pager').height();
             $('ul.pager li').hide();
             $('ul.pager').append($('<li class="loader">&nbsp;</li>').css('height', height+'px' )); */
        }

    });

    function validate($block) {

        var valid;


        $.extend($.expr[':'], {
            filled: function (el) {
                return $(el).val() !== "";
            }
        });

        $.extend($.expr[':'], {
            validDate: function (el) {
                var lang = datepickerlang.lang;
                if (supportsDateInput())
                    return $(el).val().match(/\d{4}-\d{2}-\d{2}/);
                if (lang == 'cs' || lang == 'sk' || lang == 'de' || lang == 'pl' || lang == 'ru')
                    return $(el).val().match(/^\d\d?\. ?\d\d?\. ?\d\d\d\d$/);
                if (lang == 'en')
                    return $(el).val().match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                if (lang == 'es')
                    return $(el).val().match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                if (lang == 'pt')
                    return $(el).val().match(/^\d\d\d\d\/\d\d?\/\d\d?$/);
                if (lang == 'br')
                    return $(el).val().match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                if (lang == 'it')
                    return $(el).val().match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
                if (lang == 'sv')
                    return $(el).val().match(/^\d\d?\/\d\d? \d\d\d\d$/);
                if (lang == 'hu')
                    return $(el).val().match(/^\d\d\d\d?\.?\d\d?\.?\d\d\.$/);
                if (lang == 'nl' || lang == 'fr')
                    return $(el).val().match(/^\d\d?-\d\d?-\d\d\d\d$/);
            }
        });

        if (($block.find('div.row:has(label), div.row-divide .divide-title').length < 2) && $block.is('.required'))
        {

            if (
                    $block.find(':radio').length > 0 && $block.find(':radio:checked').length > 0
                    || $block.find(':checkbox').length > 0 && $block.find(':checkbox:checked').length > 0
                    || $block.find(':text').length > 0 && $block.find(':text:filled').length > 0
                    || $block.find('select.form-control').length > 0 && $block.find('select.form-control:filled').length > 0
                    || (($block.find('.datepicker').length > 0) && ($block.find('.datepicker:validDate').length > 0))
                    || $block.find('input[type=number]').length > 0 && $block.find('input[type=number]:filled').length > 0
                    || $block.find('textarea').length > 0 && $block.find('textarea:filled').length > 0
                    )
            {
                valid = true;
            }
        } else if ($block.find('div.row').length >= 2 && $block.is('.required'))
        {
            if ($block.find('.divide-points').length == 1)
            {
                valid = $block.find('.full').length > 0;
            } else if ($block.find('.matrix-values').length == 1
                    || $block.find('.semantic-container').length > 0)
            {
                var validRows = [];
                $block.find('.input-group.row, .row-semantic').each(function (i, row) {

                    if ($(row).find('input').length == 0)
                        return;

                    if ($(row).find(':radio, :checkbox').length > 0)
                    {
                        validRows.push($(row).find(':radio:checked, :checkbox:checked').length > 0)
                    }

                    if ($(row).find(':text').length > 0)
                    {
                        validRows.push($(row).find(':text:filled').length == $(row).find(':text').length)
                    }

                });

                $.each(
                        validRows, function (i, isvalid) {
                            if (!isvalid) {
                                valid = false;
                                return;
                            }
                            if (i == validRows.length - 1 && valid !== false)
                                valid = true;
                        }
                );

            }
        } else
        {
            valid = true;
        }

        var messageElement;
        if (valid)
        {
            if ((messageElement = $block.find('.alert')).length > 0) {
                messageElement.remove();
            }
        } else
        {
            if ((messageElement = $block.find('.alert')).length == 0) {
                messageElement = $('<p class="alert alert-danger"></p>').text(lang.incomplete);
                $block.find('.special-padding-row').prepend(messageElement);
            }
        }
        try {
            if (parent.socket)
            {
                var visible = $('body').children(':visible:not(.addthis-smartlayers,#_atssh)');

                var contentH = visible.last().offset().top + visible.last().height()
                        - visible.first().offset().top + 150;
                parent.socket.postMessage(
                        contentH
                        );
            }
        } catch (e) {
        }
        return valid;
    }

    $('.require').smallipop({
        preferredPosition: 'left',
        theme: 'black',
        popupOffset: 5,
        popupDistance: 10,
        popupAnimationSpeed: 100,
        invertAnimation: true
    });

    $(window).resize(function () {
        form.divide();
    });

});


var lang = {
    "code": "br",
    "incomplete": "Por favor responda esta pergunta completamente"
}

function alertEscolha() {

    var q1select = document.querySelector('input[name="q1"]:checked').value;
    var q2select = document.querySelector('input[name="q2"]:checked').value;
    var q3select = document.querySelector('input[name="q3"]:checked').value;
    var q4select = document.querySelector('input[name="q4"]:checked').value;
    var q5select = document.querySelector('input[name="q5"]:checked').value;
    var q6select = document.querySelector('input[name="q6"]:checked').value;
    var q7select = document.querySelector('input[name="q7"]:checked').value;
    var q8select = document.querySelector('input[name="q8"]:checked').value;
    var q9select = document.querySelector('[name="q9"]').value;

    alert("Olá, você utiliza o centro de informações " + q1select + ", possui uma faixa etária entre " + q2select
            + ", utiliza o centro de informações " + q3select + " com a finalidade de " + q4select + ". \n\
            Para você " + q5select + " e você " + q6select + ", e " + q7select + ", sendo assim, o centro de informações " + q8select + " e o seu comentário ou sugestão é : " + q9select);
}

function marca(element) {
    $("nav input[type=checkbox][id!=" + $(element).attr("id") + "]")
            .attr("checked", false).toggleClass('item');
}

