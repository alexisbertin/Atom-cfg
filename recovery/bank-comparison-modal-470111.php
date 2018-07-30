<!--
    TODO:
        - Fees link
        - Each bank data
-->

<script type="text/html" id="js-bank-comparison-modal-template-<?= isset($class) ? $class : 'calc-compare-modal' ?>">
    <div class="g-modal modal <?= isset($class) ? $class : 'calc-compare-modal' ?>">
        <div class="modal__content modal__content-has-close">
            <a href="#" class="modal__close">
                <span class="modal__close-icon material-icons">cancel</span>
            </a>

            <h2 class="modal__title"><?php echo sprintf(__('Bank Comparison Details', CF_THEME); ?></h2>
            <h3 class="modal__sub-title"><?php echo sprintf(__('How we collect our data', CF_THEME); ?></h3>

            <article class="modal__article margin-bottom-m">
                <p class="margin-bottom-m">
                    <?php echo sprintf( __('The way we collect this data is very simple. There are two ways we collect it for our bank comparison chart.', CF_THEME); ?>
                </p>
                <h4 class="margin-bottom-s"><?php echo sprintf( __('How the banks change you too much', CF_THEME); ?></h4>
                <p>
                    <?php echo sprintf(
                        __('Talk about how banks rip you off and all the rest about margin and fees. Link to %sour fees%s and %sprocessing times%s.', CF_THEME),
                        '<a href="" title="">',
                        '</a>',
                        '<a href="'.get_permalink(icl_object_id(164, 'page', true)).'">',
                        '</a>';
                    ?>
                </p>
                <p>
                    <?php echo sprintf(__('Also explain a practical example of how we collect the information.
                    This is what TW says: “When we collect data from providers, we do it
                    using different “amounts”. So, pretending we’re a customer again, we
                    might go through the transfer process with £100, £500 and £2000. What
                    that means, is that for some providers, the amount(s) we entered when
                    we used their service might not be the same as the one you’ve just
                    seen in the comparison table.', CF_THEME); ?>
                </p>
            </article>

            <div class="js-comparison-table"></div>
        </div>
    </div>
</script>



<script type="text/html" id="js-bank-comparison-table-template">
    <table class="modal__table js-comparison-table">
      <caption>
          <?= __('Find the banks/FX providers and the amounts we checked, and the dates of data collection below:', CF_THEME); ?>
          <?php echo sprintf(
              __('%sYou Send: %sAUD 15,000%s', CF_THEME),
              '<p class="mobile--visible">',
              '<strong>',
              '</strong></p>';
          ?>
      </caption>
      <thead>
          <tr>
              <th><?= __('Provider', CF_THEME); ?></th>
              <th class="mobile--hidden"><?= __('You Send', CF_THEME); ?></th>
              <th><?= __('Exchange Rate', CF_THEME); ?></th>
              <th><?= __('Fee', CF_THEME); ?></th>
              <th><?= __('You Receive', CF_THEME); ?></th>
              <th class="mobile--hidden"><?= __('Date Recorded', CF_THEME); ?></th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td><?= __('CurrencyFair', CF_THEME); ?></td>
              <td class="mobile--hidden"><%= cfDeposit %></td>
              <td>1 = <%= cfRate %></td>
              <td><%= cfTransferFee %></td>
              <td><%= cfGet %></td>
              <td class="mobile--hidden">01/06/2018 GMT 12:00</td>
          </tr>
          <tr>
              <td><?= __('National Australia Bank', CF_THEME); ?></td>
              <td class="mobile--hidden"><%= cfDeposit %></td>
              <td>1 = 0.6413</td>
              <td>€3.00</td>
              <td>€9,616.88</td>
              <td class="mobile--hidden">01/06/2018 GMT 12:00</td>
          </tr>
          <tr>
              <td><?= __('Commonwealth th Bank', CF_THEME); ?></td>
              <td class="mobile--hidden"><%= cfDeposit %></td>
              <td>1 = 0.6413</td>
              <td>€3.00</td>
              <td>€9,616.88</td>
              <td class="mobile--hidden">01/06/2018 GMT 12:00</td>
          </tr>
          <tr>
              <td><?= __('Australia and New Zealand Banking Group', CF_THEME); ?></td>
              <td class="mobile--hidden"><%= cfDeposit %></td>
              <td>1 = 0.6413</td>
              <td>€3.00</td>
              <td>€9,616.88</td>
              <td class="mobile--hidden">01/06/2018 GMT 12:00</td>
          </tr>
          <tr>
              <td><?= __('Westpac', CF_THEME); ?></td>
              <td class="mobile--hidden"><%= cfDeposit %></td>
              <td>1 = 0.6413</td>
              <td>€3.00</td>
              <td>€9,616.88</td>
              <td class="mobile--hidden">01/06/2018 GMT 12:00</td>
          </tr>
      </tbody>
    </table>
</script>
